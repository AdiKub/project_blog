const jqxhr = $.getJSON("./mockedData/blog.json", response => {
  sessionStorage.setItem("response", JSON.stringify(response))
  renderIsActivBlocks(response);
})
.done((response) => {
  console.log("second success");
})
.fail((response) => {
  console.log("error");
})

const arrayOfBlocks = JSON.parse(sessionStorage.getItem("response"));

renderBlocks = (response) => {
  let count = 0;
  response.map(blogItem => {
     if (!blogItem.imageUrl) { 
      count++;
      $(".contents-wrapper_quote").prepend(
        `<section class="content">
        <h4 class="date">${blogItem.createdDate}</h4>
          <div class="content__img_container">
            <span class="content__img__text_1"><i class="fas fa-quote-left"></i></span>
            <span class="content__img__text_2">"${blogItem.quote}"</span>
            <span class="content__img__text_3">${blogItem.autor}</span>
          </div>
        <a href="" class="content__title">${blogItem.title}</a>
        <span class="content-author">
          by
          <a href="#" class="content-author_link">
          ${blogItem.autor}
          </a>
         /${blogItem.viewsCount} views
        </span> 
        <p class="content__text"> ${blogItem.discription}
        </p>
      </section>`
      )
    } else if (blogItem.link) { 
      count++;
      $(".contents-wrapper_link").prepend(
        `<section class="content">
          <h4 class="date">${blogItem.createdDate}</h4>
            <div class="content__img_container">
              <span class="content__img__text_2">${blogItem.link}</span>
            </div>
          <a href="" class="content__title">${blogItem.title}</a>
          <span class="content-author">
            by
            <a href="#" class="content-author_link">
            ${blogItem.autor}
            </a>
           /${blogItem.viewsCount} views
          </span> 
          <p class="content__text"> ${blogItem.discription}
          </p>
        </section>`
      )
    } else { 
      count++;
      $(".contents-wrapper_blog").prepend(`<section class="content">
      <h4 class="date">${blogItem.createdDate}</h4>
      <img src="${blogItem.imageUrl}" alt="" class="content-image">
      <a href="" class="content__title">${blogItem.title} </a>
      <span class="content-author">
        by
        <a href="#" class="content-author_link">
          ${blogItem.autor}
        </a>
        / ${blogItem.viewsCount} views
      </span> 
      <p class="content__text"> ${blogItem.discription}
      </p>
    </section>` )
    }
  })
  console.log(count);
}



renderIsActivBlocks = (response) => {
  clearBlogs();
  const newArr =[];
  response.map(activ=> activ.isActiv && newArr.push(activ))
  renderBlocks(newArr);
  console.log(response[1]["isActiv"])
}


$('.sub-header__title').click(() => {
  location.reload()
});

$("#aside__search__button").click(() => {
  let inputValues = $("#aside-search-input").val();
  searchBlock(inputValues);
})

$('.aside-populars_link').click((event) => {
  const clickedTag = event.target.innerHTML;
  clickTag(clickedTag)
})

$("#aside-search-input").keyup(()=>{
  let inputValues = $("#aside-search-input").val();
  inputValues === "" && renderIsActivBlocks(arrayOfBlocks);
})


const clickTag = (clickedTag) => {
  const newArr = [];
  arrayOfBlocks.map(blog =>
    blog.cotegoryName === clickedTag && newArr.push(blog));
    clearBlogs();
    newArr.length > 0? renderBlocks(newArr) : renderBlocks(arrayOfBlocks);
  console.log(clickedTag)
  count = 0;
}

searchBlock = inputValues => {
  let newArr = [];
  const regex = new RegExp(`\\B${inputValues}\\b|\\b${inputValues}`, 'gi');
  //const regex = new RegExp(`${inputValues}`, 'gi');
   console.log(regex);
  arrayOfBlocks.map(blogObject => {
    if (regex.test(blogObject.title)) {
      newArr.push(blogObject)
    }
  })
  clearBlogs();
  renderBlocks(newArr)
}

clearBlogs = () => {
  $('.contents-wrapper_quote').html('');
  $('.contents-wrapper_link').html('');
  $('.contents-wrapper_blog').html('');
}





