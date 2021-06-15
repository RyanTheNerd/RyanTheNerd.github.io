// Extract meta-inf for project data to keep code DRY

const metas = document.getElementsByTagName("meta");

function getMetaContentByProperty(property) {
    for(let meta of metas) {
        if(meta.getAttribute('property') == property) {
            return meta.getAttribute('content');
        }
    }
}

const project = {
    instructions: instructions,
    title: getMetaContentByProperty("og:title"),
    description: getMetaContentByProperty("og:description"),
    imgURL: getMetaContentByProperty("og:image"),
    destURL: getMetaContentByProperty("og:url")
}


// Make the project fade, then redirect to project
function handleClick(destURL) {
   document.body.classList.add("disappear");
   window.setTimeout(() => {
      window.location.href = destURL;
   }, 2000);
}

document.write(
`<div class="container">
   <div class="text">
      <h1>${project.title}</h1>
      <main>
         <h3>Instructions</h3>
         <pre class="instructions">${project.instructions}</pre>
         <button onClick="function() {handleClick(${project.URL})}">LAUNCH!</button>
      </main>
   </div>
   <img className="thumbnail" src="${project.imgURL}"></img>
</div>
`);
