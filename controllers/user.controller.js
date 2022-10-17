const Users = require("../users.json");
const fs = require("fs");
const dataPath = "users.json";
const { validationResult, check, body } = require("express-validator");

const getUserData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};

// done
exports.getRandomUser = (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 11);
    const jsonData = fs.readFileSync(dataPath);
    const data = JSON.parse(jsonData).find((user) => user.id === randomNumber);
    res.send({ randomUser: data });
};

// done
exports.getAllUsers = (req, res, next) => {
    const limit = req.query.limit;
    let data;
    const jsonData = fs.readFileSync(dataPath);
    if (limit) {
        data = JSON.parse(jsonData).slice(0, limit);
    } else {
        data = JSON.parse(jsonData);
    }
    return res.send({ users: data });
};

// done
exports.saveAUser = (req, res, next) => {
    const { gender, name, contact, address, photoUrl } = req.body;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }

    let user = {
        id: getUserData().length + 1,
        gender,
        name,
        contact,
        address,
        photoUrl,
    };

    Users.push(user);

    fs.writeFileSync(dataPath, JSON.stringify(Users));

    res.send({ status: "saved", users: [...Users] });
};

// done
exports.updateAUser = (req, res, next) => {
    const { id, gender, name, contact, address, photoUrl } = req.body;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }

    let existUsers;
    const jsonData = fs.readFileSync(dataPath);
    existUsers = JSON.parse(jsonData);

    const userId = id;
    existUsers[userId - 1].id = id;
    existUsers[userId - 1].gender = gender;
    existUsers[userId - 1].name = name;
    existUsers[userId - 1].contact = contact;
    existUsers[userId - 1].address = address;
    existUsers[userId - 1].photoUrl = photoUrl;

    // existUsers[userId].gender = gender;
    // existUsers[userId].name = name;
    // existUsers[userId].contact = contact;
    // existUsers[userId].address = address;
    // existUsers[userId].photoUrl = photoUrl;
    saveUserData(existUsers);
    res.send({ status: "updated", users: existUsers });
};

// done
exports.updateBulkUser = (req, res, next) => {
    const { ids, id, gender, name, contact, address, photoUrl } = req.body;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }

    let existUsers;
    const jsonData = fs.readFileSync(dataPath);
    existUsers = JSON.parse(jsonData);

    ids.forEach((id) => {
        existUsers[id - 1].id = id || existUsers[id - 1].id;
        existUsers[id - 1].gender = gender || existUsers[id - 1].gender;
        existUsers[id - 1].name = name || existUsers[id - 1].name;
        existUsers[id - 1].contact = contact || existUsers[id - 1].contact;
        existUsers[id - 1].address = address || existUsers[id - 1].address;
        existUsers[id - 1].photoUrl = photoUrl || existUsers[id - 1].photoUrl;
    });
};

// done
exports.deleteAUser = (req, res) => {
    const id = req.body.id;

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }

    const users = Users.filter((user) => user.id != id);

    saveUserData(users);
    res.send({ status: "deleted", users: users });
};
