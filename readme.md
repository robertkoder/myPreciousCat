# My precious cat
[![Netlify Status](https://api.netlify.com/api/v1/badges/4be1ee80-3201-45c6-a748-555c85d2fde7/deploy-status)](https://app.netlify.com/sites/clever-crisp-2bafe2/deploys)


I put my cat on the internet, what's the worst that could happen?  

I was bored and uninspired to write something about myself so I made this instead.  

The [cat] is from [CSSScript.com][cssscript]  
I just added some logic to detect if the cat collides with the bomb,  
and if the user tries to refresh the page after such a horrific event.  


#### \**notes\**

Jeg satt de fleste elementene som `visibility: hidden;` for å unngå at de ble "flashet" på page refresh.  
Kunne tenkt meg feedback på akkurat denne metoden, om det er en bedre/mer vanlig approach?  

Jeg prøvde. uten alt for mye effort, å gruppere ting for å unngå å repetere kode  
men ble litt lost i egen koden til slutt med alle elementene som påvirker hverandre.  
Kunne sikkert vert satt opp bedre og mer oversiktlig. Kunne tenkt meg feedback på det og.  

En ting jeg slet med å få til som jeg gav opp på til slutt var hvordan jeg skulle få `<h1 id="evilPersonDetected">What have you done? :(</h1>` til å være hidden by default, fade in på explosion og så forbli visible på page refresh og så fade out isteden mens den andre teksten fader inn.  
En metode jeg tenkte på men som jeg ikke likte og heller ikke prøvde var å lage en identisk tekst med andre egenskaper.  
Ble mye rot og att og frem så fant ut det var alt for mye effort så tidlig i kurset 😅  

Eneste kode erfaring jeg har fra før er minimalt med lua redigering for WoW AddOns.  
Har for litt siden started et lite hobby prosjekt med en "fullspikka" WoW AddOn som jeg  
roter med til hodet eksploderer av overkomplisert kode, men det går på fram! 😂   




[cat]: <https://www.cssscript.com/cat-follow-cursor-oneko/#google_vignette>
[cssscript]: <https://www.cssscript.com/>