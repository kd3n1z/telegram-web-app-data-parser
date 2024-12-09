import { createHmac } from 'crypto';
import type { WebAppInitData } from './WebAppInitData';

function getHmacSha256Hash(key: Buffer | string, data: string) {
    return createHmac('sha256', key).update(data);
};

type ParseResult = {
    validated: true,
    data: WebAppInitData
} | {
    validated: false
};

type Parser = {
    parse: (initData: string) => ParseResult
}

export function createParser(botToken: string): Parser {
    const secretToken = getHmacSha256Hash("WebAppData", botToken).digest();

    return {
        parse: (initData: string) => {
            // initial parsing & hash + auth_date validation

            const searchParams = new URLSearchParams(initData);

            let fields: { [key: string]: string } = {};

            for (const key of searchParams.keys()) {
                const value = searchParams.get(key);

                if (value === null) {
                    continue;
                }

                fields[key] = value;
            }

            const hash = fields['hash'];
            const authDateString = fields['auth_date'];

            if (typeof hash !== 'string' || typeof authDateString != 'string') {
                return {
                    validated: false
                };
            }

            const auth_date = parseInt(authDateString);

            if (isNaN(auth_date)) {
                return {
                    validated: false
                };
            }

            // hash validation

            delete fields['hash'];

            const dataCheckString = Object.entries(fields)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(e => e[0] + "=" + e[1])
                .join('\n');

            if (getHmacSha256Hash(secretToken, dataCheckString).digest('hex') != hash) {
                return {
                    validated: false
                };
            }

            // WebAppInitData parsing

            let data: WebAppInitData = { hash, auth_date };

            const query_id = fields['query_id'];
            if (typeof query_id === 'string') {
                data.query_id = query_id;
            }

            const userJsonString = fields['user'];
            if (typeof userJsonString === 'string') {
                try {
                    data.user = JSON.parse(userJsonString);
                } catch { }
            }

            const receiverJsonString = fields['receiver'];
            if (typeof receiverJsonString === 'string') {
                try {
                    data.receiver = JSON.parse(receiverJsonString);
                } catch { }
            }

            const chatJsonString = fields['chat'];
            if (typeof chatJsonString === 'string') {
                try {
                    data.chat = JSON.parse(chatJsonString);
                } catch { }
            }

            const chat_type = fields['chat_type'];
            if (typeof chat_type === 'string') {
                if (["sender", "private", "group", "supergroup", "channel"].includes(chat_type)) {
                    data.chat_type = chat_type as any;
                }
            }

            const chat_instance = fields['chat_instance'];
            if (typeof chat_instance === 'string') {
                data.chat_instance = chat_instance;
            }

            const start_param = fields['start_param'];
            if (typeof start_param === 'string') {
                data.start_param = start_param;
            }

            const canSendAfterString = fields['can_send_after'];
            if (typeof canSendAfterString === 'string') {
                const can_send_after = parseInt(canSendAfterString);

                if (!isNaN(can_send_after)) {
                    data.can_send_after = can_send_after;
                }
            }

            return {
                validated: true,
                data
            };
        }
    };
}