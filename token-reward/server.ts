import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import { rewardUser } from './caminoUtil';

export const DB_USER = process.env.DB_USER;

if (!DB_USER) {
    throw new Error('Please make sure you have a .env file with the required variables.');
}

const app = express();
app.use(express.json());

// Allow cross-origin requests
app.use(cors());

// Create connection pool to PostgreSQL
const pool = new Pool({
    host: 'localhost',
    user: DB_USER,
    database: 'onions',
    port: 5432,
});

// Get all events
app.get('/api/events', async (req: express.Request, res: express.Response) => {
    try {
        const results = await pool.query('SELECT * FROM events');
        res.send(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/api/book_event', async (req: express.Request, res: express.Response) => {
    try {
        console.log(req);
        const { eventId, userAddress } = req.body;

        if (!eventId) {
            return res.status(400).send('Event ID is required');
        }

        // Assuming bookEvent is an async function that takes an event ID
        await bookEvent(userAddress, eventId);
        res.send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

async function bookEvent(userAddress: string, eventId: number) {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);

    if (event.rows.length === 0) {
        throw new Error(`Event with ID ${eventId} not found`);
    }

    const reward = event.rows[0].reward;
    // TODO
    console.log(`rewardUser(${userAddress}, ${reward})`)
    await rewardUser(userAddress, reward);
}
