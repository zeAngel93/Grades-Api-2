import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const router = express.Router();

router.patch('/:subject/:type', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));

    /*
    let value = data.grades.reduce((acc, current) => {
      req.params.student === current.student &&
      req.params.subject === current.subject
        ? current
        : 0;
      return acc + current.value;
    }, 0);
    */
    let value = 0;
    let count = 0;
    let array = [];
    for (let i = 0; i < data.grades.length; i++) {
      if (
        req.params.subject === data.grades[i].subject &&
        req.params.type === data.grades[i].type
      ) {
        value += data.grades[i].value;
        count++;
        array.push(data.grades[i]);
      }
    }
    array = await array.sort((a, b) => a.value - b.value);
    array = [
      array[array.length - 1],
      array[array.length - 2],
      array[array.length - 3],
    ];
    let sended = {
      total: value,
      registros: count,
      media: value / count,
      ...array,
    };

    res.status(400).send(JSON.stringify(sended));
  } catch (err) {
    console.log(err);
  }
});

export default router;
