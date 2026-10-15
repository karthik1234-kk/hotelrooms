const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
let rooms = [];
let nextId = 1;
app.post("/rooms", (req, res) => {
    const { name, location, type, pricepernight, capacity, available, roomnumber } = req.body;
    if (
        typeof name !== "string" || !name.trim() ||
        typeof location !== "string" || !location.trim() ||
        typeof type !== "string" || !type.trim() ||
        typeof pricepernight !== "number" || !Number.isFinite(pricepernight) || pricepernight < 0 ||
        typeof capacity !== "number" || !Number.isInteger(capacity) || capacity <= 0 ||
        typeof roomnumber !== "string" || !roomnumber.trim()
    ) {
        return res.status(400).json({
            message: "Validation failed. Ensure name, location, type, and roomnumber are non-empty strings. pricepernight must be a positive number. capacity must be an integer greater than 0."
        });
    }
    const roomExists = rooms.some(
        r => r.location.toLowerCase() === location.trim().toLowerCase() && 
             r.roomnumber.toLowerCase() === roomnumber.trim().toLowerCase()
    );
    
    if (roomExists) {
        return res.status(400).json({
            message: `Room number ${roomnumber.trim()} already exists at location: ${location.trim()}.`
        });
    }

    const room = {
        id: nextId++,
        name: name.trim(),
        location: location.trim(),
        type: type.trim(),
        pricepernight,
        capacity,
        // Defaults to true if not explicitly provided as a boolean
        available: typeof available === "boolean" ? available : true,
        roomnumber: roomnumber.trim()
    };

    rooms.push(room);
    return res.status(201).json(room);
});
app.get("/rooms", (req, res) => {
    const { location, available } = req.query;
    let filteredRooms = [...rooms];
    if (location) {
        filteredRooms = filteredRooms.filter(r => r.location.toLowerCase() === location.toLowerCase());
    }
    if (available !== undefined) {
        const isAvailable = available === "true";
        filteredRooms = filteredRooms.filter(r => r.available === isAvailable);
    }

    return res.status(200).json(filteredRooms);
});
app.get("/rooms/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid room ID format." });
    }

    const room = rooms.find(r => r.id === id);

    if (!room) {
        return res.status(404).json({ message: "Room not found." });
    }

    return res.status(200).json(room);
});
app.put("/rooms/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid room ID format." });
    }

    const index = rooms.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Room not found." });
    }

    const { name, location, type, pricepernight, capacity, available, roomnumber } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof location !== "string" || !location.trim() ||
        typeof type !== "string" || !type.trim() ||
        typeof pricepernight !== "number" || !Number.isFinite(pricepernight) || pricepernight < 0 ||
        typeof capacity !== "number" || !Number.isInteger(capacity) || capacity <= 0 ||
        typeof available !== "boolean" ||
        typeof roomnumber !== "string" || !roomnumber.trim()
    ) {
        return res.status(400).json({ message: "Validation failed. Please provide all fields correctly." });
    }
    const roomExists = rooms.some(
        r => r.id !== id &&
             r.location.toLowerCase() === location.trim().toLowerCase() && 
             r.roomnumber.toLowerCase() === roomnumber.trim().toLowerCase()
    );
    
    if (roomExists) {
        return res.status(400).json({ message: `Another room with number ${roomnumber.trim()} already exists at that location.` });
    }

    const updatedRoom = {
        id: rooms[index].id,
        name: name.trim(),
        location: location.trim(),
        type: type.trim(),
        pricepernight,
        capacity,
        available,
        roomnumber: roomnumber.trim()
    };

    rooms[index] = updatedRoom;
    return res.status(200).json(updatedRoom);
});
app.delete("/rooms/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid room ID format." });
    }

    const index = rooms.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Room not found." });
    }

    const deletedRoom = rooms.splice(index, 1)[0];
    return res.status(200).json({
        message: "Room deleted successfully.",
        room: deletedRoom
    });
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
