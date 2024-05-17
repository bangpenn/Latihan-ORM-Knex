import express, { Express, Request, Response } from 'express'
import knex from 'knex'
import { Model } from 'objection'
import { ArticleModel } from './model/article.model'

const app: Express = express()
const port = 8000

const knexInstance = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '1234',
      database: 'CH05',
    },
})

Model.knex(knexInstance)

// Middleware agar Express dapat membaca body dalam format JSON
app.use(express.json());

app.get('/', (_, res: Response) => {
    res.send('Express + TypeScript Server')
})


// Endpoint untuk menampilkan semua artikel
app.get('/articles', async (_, res: Response) => {
    try {
        const articles = await ArticleModel.query().withGraphFetched('comments');

        res.json({ data: articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Error fetching articles' });
    }
})



// Endpoint untuk menampilkan satu artikel berdasarkan ID
app.get('/articles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.query().findById(id);
        if (article) {
            res.json({ data: article });
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        res.status(500).json({ error: 'Error fetching article by ID' });
    }
})

// Endpoint untuk membuat artikel baru
app.post('/articles', async (req: Request, res: Response) => {
    const { title, content } = req.body;
    try {
        const newArticle = await ArticleModel.query().insert({ title, content, aprove: false });
        res.status(201).json({ data: newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Error creating article' });
    }
});


// Endpoint untuk mengupdate artikel berdasarkan ID
app.put('/articles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedArticle = await ArticleModel.query().patchAndFetchById(id, { title, content });
        res.json({ data: updatedArticle });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: 'Error updating article' });
    }
})



// Endpoint untuk menghapus artikel berdasarkan ID
app.delete('/articles/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ArticleModel.query().deleteById(id);
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Error deleting article' });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});