import{i as f}from"./assets/vendor-32231325.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m=document.querySelector(".search-form"),c=document.querySelector(".gallery"),n=document.querySelector(".load-more");let l=1,d=0,u="";n.hidden=!0;m.addEventListener("submit",p);n.addEventListener("click",y);async function p(o){o.preventDefault(),c.innerHTML="",n.hidden=!0,c.classList.remove("grid-styling"),l=1,d=0,u=o.currentTarget.elements.searchQuery.value;try{h(u)}catch(r){console.error(r)}finally{m.reset()}}async function y(){n.hidden=!0,l+=1,console.log(l);try{await h(u,l)}catch(o){console.error(o)}}async function h(o,r=1){const i=await g(o,r);i.totalHits,d=Math.ceil(i.totalHits/40);const s=i.hits;s.length===0?v("Sorry, there are no images matching your search query. Please try again."):(r===1&&L(`Hooray! We found ${i.totalHits} images.`),c.classList.add("grid-styling"),r<d?(n.disabled=!1,n.removeAttribute("style"),n.textContent="Load more",n.hidden=!1):(n.hidden=!0,r!==1&&(n.hidden=!1,n.disabled=!0,n.setAttribute("style",`
            background: none;
            color: inherit;
            border: none;
            padding: 0;
            font: inherit;
            cursor: default;
            outline: inherit;
        `),n.textContent="We're sorry, but you've reached the end of search results.")),c.insertAdjacentHTML("beforeend",b(s)))}async function g(o,r){const i="https://pixabay.com/api/",s="42185018-8d9cd3aefdae43a32ddab8929",e=new URLSearchParams({key:s,per_page:40,page:r,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"}),t=await fetch(`${i}?${e}`);if(!t.ok)throw new Error(t.statusText);return await t.json()}function b(o){return o.map(({webformatURL:r,tags:i,likes:s,views:e,comments:t,downloads:a})=>`
      <div class="photo-card">
        <img src="${r}" alt="${i}" loading="lazy" />
        <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${s}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${e}
          </p>
            <p class="info-item">
              <b>Comments</b>
              ${t}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${a}
            </p>
        </div>
      </div>
    `).join("")}function L(o){return f.show({message:`${o}`,color:"green",position:"topRight",timeout:3e3})}function v(o){return c.insertAdjacentHTML("afterbegin","<div class='iziToastLocation' style='width: 60%'></div>"),f.show({message:`${o}`,color:"grey",target:".iziToastLocation",timeout:!1})}
//# sourceMappingURL=commonHelpers.js.map
