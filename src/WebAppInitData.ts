// copied from @types/telegram-web-app 7.10.1

/**
 * This object contains data that is transferred to the Web App when it is
 * opened. It is empty if the Web App was launched from a keyboard button.
 */
export interface WebAppInitData {
    /**
     * A unique identifier for the Web App session, required for sending
     * messages via the answerWebAppQuery method.
     */
    query_id?: string;
    /** An object containing data about the current user. */
    user?: WebAppUser;
    /**
     * An object containing data about the chat partner of the current user in
     * the chat where the bot was launched via the attachment menu. Returned
     * only for Web Apps launched via the attachment menu.
     */
    receiver?: WebAppUser;
    /**
     * An object containing data about the chat where the bot was launched via
     * the attachment menu. Returned for supergroups, channels and group chats –
     * only for Web Apps launched via the attachment menu.
     */
    chat?: WebAppChat;
    /**
     * Type of the chat from which the Web App was opened. Can be either
     * “sender” for a private chat with the user opening the link, “private”,
     * “group”, “supergroup”, or “channel”. Returned only for Web Apps launched
     * from direct links.
     */
    chat_type?: "sender" | "private" | "group" | "supergroup" | "channel";
    /**
     * Global identifier, uniquely corresponding to the chat from which the Web
     * App was opened. Returned only for Web Apps launched from a direct link.
     */
    chat_instance?: string;
    /**
     * The value of the startattach parameter, passed via link. Only returned
     * for Web Apps when launched from the attachment menu via link. The value
     * of the start_param parameter will also be passed in the GET-parameter
     * tgWebAppStartParam, so the Web App can load the correct interface right
     * away.
     */
    start_param?: string;
    /**
     * Time in seconds, after which a message can be sent via the
     * answerWebAppQuery method.
     */
    can_send_after?: number;
    /** Unix time when the form was opened. */
    auth_date: number;
    /**
     * A hash of all passed parameters, which the bot server can use to check
     * their validity.
     */
    hash: string;
}

/** This object contains the data of the Web App user. */
export interface WebAppUser {
    /**
     * A unique identifier for the user or bot. This number may have more than
     * 32 significant bits and some programming languages may have
     * difficulty/silent defects in interpreting it. It has at most 52
     * significant bits, so a 64-bit integer or a double-precision float type is
     * safe for storing this identifier.
     */
    id: number;
    /** True, if this user is a bot. Returns in the receiver field only. */
    is_bot?: boolean;
    /** First name of the user or bot. */
    first_name: string;
    /** Last name of the user or bot. */
    last_name?: string;
    /** Username of the user or bot. */
    username?: string;
    /** IETF language tag of the user's language. Returns in user field only. */
    language_code?: string;
    /** True, if this user is a Telegram Premium user. */
    is_premium?: true;
    /** True, if this user added the bot to the attachment menu. */
    added_to_attachment_menu?: true;
    /** True, if this user allowed the bot to message them. */
    allows_write_to_pm?: true;
    /**
     * URL of the user’s profile photo. The photo can be in .jpeg or .svg
     * formats. Only returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
}

/**
 * This object represents a chat.
 */
export interface WebAppChat {
    /**
     * Unique identifier for this chat. This number may have more than 32
     * significant bits and some programming languages may have
     * difficulty/silent defects in interpreting it. But it has at most 52
     * significant bits, so a signed 64-bit integer or double-precision float
     * type are safe for storing this identifier.
     */
    id: number;
    /**
     * Type of chat, can be either “group”, “supergroup” or “channel”
     */
    type: "group" | "supergroup" | "channel";
    /**
     * Title of the chat
     */
    title: string;
    /**
     * Username of the chat
     */
    username?: string;
    /**
     * URL of the chat’s photo. The photo can be in .jpeg or .svg formats. Only
     * returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
}