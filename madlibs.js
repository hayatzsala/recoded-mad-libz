const editArea = document.querySelector('.madLibsEdit');
const viewArea = document.querySelector('.madLibsPreview');
/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
const REGIX_FORMAT = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punc>[\.,])?/;
function getType(pos){
  switch (pos){
    case '[n]':
      return 'none';
    case '[v]':
      return 'verb';
    case '[a]':
      return 'adjective';
    
  }
  
}
function parseStory(rawStory) {
  console.log(rawStory);
  var splitedData = rawStory.split(' ')
  var result = [];
  for(let i=0;i<splitedData.length; i++ ){
    var res = REGIX_FORMAT.exec(splitedData[i]).groups;
    //console.log(res);
    
    result.push({
      word: res.word,
      pos: res.pos ? getType(res.pos) : undefined,
    });
    if(res.punc !== undefined){
      result.push({
        word: res.punc
      });
    }
  }
  return result; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    PrintStory(processedStory);
    

    console.log(processedStory);
  });
const MAX_INPUT = 10;
  function PrintStory(story){
    var count =1;
    var allStory = '';
    var reviewStory = '';
    console.log(story.length);
    for(let i=0;i < story.length;i++){
      allStory += story[i].pos === undefined || count > MAX_INPUT
      ? story[i].word + ' '
      :getPosElement(story[i].pos,i); 

      reviewStory += story[i].pos === undefined || count > MAX_INPUT
      ? story[i].word + ' '
      :getPosElementReview(story[i].pos,i);

      count += story[i].pos!==undefined ? 1 : 0; 
    }
    console.log(allStory);
    editArea.innerHTML=allStory;
    viewArea.innerHTML = reviewStory;
  }

function getPosElement(pos,id){
  if(pos === undefined){
    return '';
  }
  return `<input placeholder="${pos}" id="input-${id}" onInput="printText(this)" maxlength="20"/>`
}
function getPosElementReview(pos, id){
  if(pos === undefined){
    return '';
  }
  return `<input placeholder="${pos}" id="review-${id}" disabled maxlength="20">`
}

const printText=(txt)=>{
  var id = txt.id.split('-');
 
  document.addEventListener('keydown', (event) => {
    if(event.key == "Enter") {
      target = event.target || event.srcElement,
            nextInput = target.nextSibling;
        while ( nextInput.tagName !== 'INPUT' && nextInput.nextSibling ) {
            nextInput = nextInput.nextSibling;
        }
        nextInput.focus();
  }
});
  const review = document.querySelector(`#review-${id[1]}`);
  review.value = txt.value;
}