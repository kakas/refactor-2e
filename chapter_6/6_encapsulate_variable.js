let defaultOwner = {firstName: "Martin", lastName: "Fowler"};
function getDefaultOwner()    {return defaultOwner;}
function setDefaultOwner(arg) {defaultOwner = arg;}
spaceship.owner = getDefaultOwner();
setDefaultOwner({firstName: "Rebecca", lastName: "Parsons"});
