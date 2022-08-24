const editArea = document.querySelector('.madLibsEdit');
const viewArea = document.querySelector('.madLibsPreview');
const REGIX_FORMAT = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punc>[\.,])?/;
const MAX_INPUT = 10;

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    PrintStory(processedStory);
  })
  .then(loadData);

function parseStory(rawStory) {
  console.log(rawStory);
  var splitedData = rawStory.split(' ')
  var result = [];
  for (let i = 0; i < splitedData.length; i++) {
    var res = REGIX_FORMAT.exec(splitedData[i]).groups;
    result.push({
      word: res.word,
      pos: res.pos ? getType(res.pos) : undefined,
    });
    if (res.punc !== undefined) {
      result.push({
        word: res.punc
      });
    }
  }
  return result;
}

function getType(pos) {
  switch (pos) {
    case '[n]':
      return 'none';
    case '[v]':
      return 'verb';
    case '[a]':
      return 'adjective';

  }

}


let ids = 0;
function PrintStory(story) {
  var count = 1;
  var allStory = '';
  var reviewStory = '';
  console.log(story.length);
  for (let i = 0; i < story.length; i++) {
    allStory += story[i].pos === undefined || count > MAX_INPUT
      ? story[i].word + ' '
      : getPosElement(story[i].pos, ids);

    reviewStory += story[i].pos === undefined || count > MAX_INPUT
      ? story[i].word + ' '
      : getPosElementReview(story[i].pos, ids);

    count += story[i].pos !== undefined ? 1 : 0;

  }
  // console.log(allStory);
  editArea.innerHTML = allStory;
  viewArea.innerHTML = reviewStory;

}

function getPosElement(pos, id) {
  if (pos === undefined) {
    return '';
  }
  ids++;
  return `<input placeholder="${pos}" id="input-${id}" onInput="printText(this)" maxlength="20"/>`
}

function getPosElementReview(pos, id) {
  if (pos === undefined) {
    return '';
  }
  return `<input placeholder="${pos}" id="review-${id - 1}" disabled maxlength="20">`
}

const printText = (txt) => {
  var id = txt.id.split('-');

  document.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
      target = event.target,
        nextInput = target.nextSibling;
      while (nextInput.tagName !== 'INPUT' && nextInput.nextSibling) {
        nextInput = nextInput.nextSibling;

      }
      localStorage.setItem(txt.id, txt.value);
      nextInput.focus();
    }
  });
  const review = document.querySelector(`#review-${id[1]}`);
  review.value = txt.value;
}
/********** BONUS 1 *********************/
function loadData() {

  for (let i = 0; i < MAX_INPUT; i++) {
    const edit = document.querySelector(`#input-${i}`);
    const review = document.querySelector(`#review-${i}`);

    
    edit.value = localStorage.getItem(edit.id) ?? '';
    review.value = localStorage.getItem(edit.id) ?? '';

  }

}
/********** BONUS 1 *********************/

