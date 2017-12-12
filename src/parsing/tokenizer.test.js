import { tokenize } from './tokenizer';

it('Tokenizes a sequence of digits into a single digit token', () => {
    const str = '123';
    const output = tokenize(str);

    expect(output).toEqual([123]);
});

it('Tokenizes a sequence of digits + period + digits into a single digit token', () => {
    const str = '123.456';
    const output = tokenize(str);

    expect(output).toEqual([123.456]);
});
