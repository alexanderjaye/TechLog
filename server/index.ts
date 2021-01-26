import app from './app';
const PORT: number = Number(process.env.PORT) || 3002;
const HOST: string = process.env.HOST || `a secret host`;

//Start server
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});
