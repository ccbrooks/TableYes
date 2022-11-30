const express = require('express');
const app = express();
  
app.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});
  
app.get('/:id', (req, res) => {
  res.send(`<h1>${req.params.id}</h1>`);
});
  
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});


const arr1 = [5, 4, 3, 2, 1];
const arr2 = [2, 3];
// helper function
const sorter = (a, b, arr) => {
   if(arr.includes(a)){
      return -1;
   };
   if(arr.includes(b)){
      return 1;
   };
   return a - b;
};
const prioritySort = (arr1, arr2) => {
   arr1.sort((a, b) => sorter(a, b, arr2));
};
prioritySort(arr1, arr2);
console.log(arr1);