const THEME = process.env.THEME || 'default';
const sharedStyles = require(`./themes/${ THEME }/main.scss`);

export default sharedStyles;
