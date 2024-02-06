import{s as y,a as b,i as f}from"./assets/vendor-64bdb1f6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const h=document.querySelector(".search-form"),c=document.querySelector(".gallery"),s=document.querySelector(".load-more");let l=1,u=0,d="";s.hidden=!0;h.addEventListener("submit",w);s.addEventListener("click",v);const L=new y(".gallery a");async function w(r){if(r.preventDefault(),c.innerHTML="",s.hidden=!0,c.classList.remove("grid-styling"),l=1,u=0,d=r.currentTarget.elements.searchQuery.value,!d.trim().length)throw g("Please insert something into the search bar to get images"),new Error("Error: No search query");try{m(d)}catch(o){console.error(o)}finally{h.reset()}}async function v(){s.hidden=!0,l+=1,console.log(l);try{await m(d,l)}catch(r){console.error(r)}}async function m(r,o=1){const n=await $(r,o);u=Math.ceil(n.totalHits/40);const i=n.hits;i.length===0?g("Sorry, there are no images matching your search query. Please try again."):(o===1&&E(`Hooray! We found ${n.totalHits} images.`),c.classList.add("grid-styling"),o!=u?(s.disabled=!1,s.removeAttribute("style"),s.textContent="Load more",s.hidden=!1):P(),c.insertAdjacentHTML("beforeend",T(i)),L.refresh())}async function $(r,o){const n="https://pixabay.com/api/",i="42185018-8d9cd3aefdae43a32ddab8929",e=new URLSearchParams({key:i,per_page:40,page:o,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"}),t=await b.get(`${n}?${e}`);if(!t.statusText==="OK")throw new Error(t.statusText);return await t.data}function T(r){return r.map(({largeImageURL:o,webformatURL:n,tags:i,likes:e,views:t,comments:a,downloads:p})=>`
      <a href="${o}">
        <div class="photo-card">
          <img src="${n}" alt="${i}" loading="lazy" />
          <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${e}
              </p>
              <p class="info-item">
              <b>Views</b>
              ${t}
            </p>
              <p class="info-item">
                <b>Comments</b>
                ${a}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${p}
              </p>
          </div>
        </div>
      </a>
    `).join("")}function E(r){return f.show({message:`${r}`,color:"green",position:"topRight",timeout:3e3})}function g(r){return c.insertAdjacentHTML("afterbegin","<div class='iziToastLocation' style='width: 60%'></div>"),f.show({message:`${r}`,color:"grey",target:".iziToastLocation",timeout:!1})}function P(){s.hidden=!1,s.disabled=!0,s.setAttribute("style",`
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: default;
      outline: inherit;
  `),s.textContent="We're sorry, but you've reached the end of search results."}
//# sourceMappingURL=commonHelpers.js.map
