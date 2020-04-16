let _title = "untitled";

result += `<h1>${title()}</h1>`;
setTitle(obj['articleTitle']);

function title()       {return _title;}
function setTitle(arg) {_title = arg;}

const cpyNm = "Acme Gooseberries";
