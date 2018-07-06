/**
 * Html
 * This Html.ts file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = ({ body, title }: { body: string, title: string }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="keywords" content="dylan legendre, weather" />
      <meta name="description" content="An SSR React App demo implementing Open APIs" />
      <meta name="author" content="Dylan Legendre" />
      <meta name="copyright" content="Copyright &copy; 2018. All Rights Reserved." />
      <base href="/">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default html;
