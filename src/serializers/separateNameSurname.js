const separateNameSurname = (fullName) => {
    let names;
    let surnames;
    if (fullName.split(" ").length === 2) {
        names = fullName.split(' ', 1).join(' ');
        surnames = fullName.split(' ').slice(1,2).join(' ');
    } else {
        names = fullName.split(' ', 2).join(' ');
        surnames = fullName.split(' ').slice(2,4).join(' ');
    }
    return {
        names,
        surnames
    }
};

module.exports = separateNameSurname;