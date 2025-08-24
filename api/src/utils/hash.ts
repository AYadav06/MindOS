export function random(n:number){

    let options="qwertyuiopasdfjklzxcvbnm1234567890";
    let length=options.length;

    let ans="";

    for(let i=0;i<10;i++){
        ans+=options[Math.floor((Math.random()*length))];
    }
    return ans;
}