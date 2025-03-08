const  {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all notifications
const getNotifications = async (req, res) => {
    const notifications = await prisma.notification.findMany();
    res.json(notifications);
};

// Fetch a single notification
const getNotification = async (req, res) => {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(notification);
};

// Create a new notification
const createNotification = async (req, res) => {
    try{
        const { userId, message, type} = req.body;
        if (!userId  || !message) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const notification = await prisma.notification.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                message,
                type,
            }
        });
        res.json(notification);

    } catch(err){
        console.log("server error", err)
    }
}



module.exports = {
    getNotifications,
    getNotification,
    createNotification,
};