import{i as f}from"./assets/vendor-32231325.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m=document.querySelector(".search-form"),c=document.querySelector(".gallery"),i=document.querySelector(".load-more");let l=1,u=0,d="";i.hidden=!0;m.addEventListener("submit",h);i.addEventListener("click",y);async function h(o){o.preventDefault(),c.innerHTML="",i.hidden=!0,c.classList.remove("grid-styling"),l=1,d=o.currentTarget.elements.searchQuery.value;try{p(d)}catch(r){console.error(r)}finally{m.reset()}}async function y(){i.hidden=!0,l+=1,console.log(l);try{await p(d,l)}catch(o){console.error(o)}}async function p(o,r=1){const s=await g(o,r);u=Math.ceil(s.totalHits/40);const n=s.hits;n.length===0?v("Sorry, there are no images matching your search query. Please try again."):(b(`Hooray! We found ${s.totalHits} images.`),c.classList.add("grid-styling"),r<u?i.hidden=!1:(i.hidden=!0,i.replaceWith("We're sorry, but you've reached the end of search results.")),c.insertAdjacentHTML("beforeend",L(n)))}async function g(o,r){const s="https://pixabay.com/api/",n="42185018-8d9cd3aefdae43a32ddab8929",e=new URLSearchParams({key:n,per_page:40,page:r,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"}),t=await fetch(`${s}?${e}`);if(!t.ok)throw new Error(t.statusText);return await t.json()}function L(o){return o.map(({webformatURL:r,tags:s,likes:n,views:e,comments:t,downloads:a})=>`
      <div class="photo-card">
        <img src="${r}" alt="${s}" loading="lazy" />
        <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${n}
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
    `).join("")}function b(o){return f.show({message:`${o}`,color:"green",position:"topRight",timeout:3e3})}function v(o){return c.insertAdjacentHTML("afterbegin","<div class='iziToastLocation' style='width: 60%'></div>"),f.show({message:`${o}`,color:"grey",target:".iziToastLocation",timeout:!1})}
//# sourceMappingURL=commonHelpers.js.map
