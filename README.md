# telegram-web-app-data-parser

A lightweight parser for validating and extracting data from Telegram Web App's initialization data. This library ensures data validation using HMAC-SHA256 hashing.

## Usage

Here's an example of how to use the parser:

```js
import { createParser } from 'telegram-web-app-data-parser';

const botToken = 'your-bot-token-here';

const parser = createParser(botToken);

const result = parser.parse('query_id=123&auth_date=1234567890&hash=abcdef...');

if (result.validated) {
    console.log('Validated data:', result.data);
} else {
    console.log('Validation failed.');
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
