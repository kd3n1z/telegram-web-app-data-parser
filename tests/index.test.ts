import { createParser } from '../src/index';

describe('validation', () => {
    const parser = createParser('123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11');

    test('no hash', () => {
        expect(
            parser.parse(
                'user=%7B%22first_name%22%3A%22test%22%7D&auth_date=1'
            ).validated
        ).toBe(false);
    });

    test('invalid hash', () => {
        expect(
            parser.parse(
                'user=%7B%22first_name%22%3A%22test2%22%7D&auth_date=1&hash=c8a1a1fcd1bc0ffd66f4202a82fc92afa3078d97668eb392dd4ea7df2655e6c9'
            ).validated
        ).toBe(false);
    });

    test('valid', () => {
        expect(
            parser.parse(
                'user=%7B%22first_name%22%3A%22test%22%7D&auth_date=1&hash=c8a1a1fcd1bc0ffd66f4202a82fc92afa3078d97668eb392dd4ea7df2655e6c9'
            ).validated
        ).toBe(true);
    });
});

test('parsing', () => {
    const parser = createParser('123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11');

    expect(
        parser.parse(
            'user=%7B%22first_name%22%3A%22test%22%7D&auth_date=1&hash=c8a1a1fcd1bc0ffd66f4202a82fc92afa3078d97668eb392dd4ea7df2655e6c9'
        )
    ).toStrictEqual({
        validated: true,
        data: {
            auth_date: 1,
            user: {
                first_name: 'test'
            },
            hash: 'c8a1a1fcd1bc0ffd66f4202a82fc92afa3078d97668eb392dd4ea7df2655e6c9'
        }
    });
});
