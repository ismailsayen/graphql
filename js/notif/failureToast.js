export function failureToast(text) {
    let par = document.querySelector('.notif-sec')
    if (!par) {
        par = document.createElement('div')
        par.className = 'notif-sec'
        document.body.appendChild(par)
    }
    const toast = document.createElement('div');
    toast.className = 'failure-toast';
    toast.innerHTML = /*html*/` 
        <div>
            <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" class="icon-failure">
                <g transform="translate(0,-952.36218)">
                    <path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:red;enable-background:accumulate;" d="m 50.000001,958.36218 c -24.27684,0 -44,19.7233 -44,44.00002 0,24.2768 19.72317,44 44,44 24.276898,0 43.999998,-19.7232 43.999998,-44 0,-24.27672 -19.7231,-44.00002 -43.999998,-44.00002 z m 0,4 c 22.115098,0 39.999998,17.8851 39.999998,40.00002 0,22.115 -17.8849,40 -39.999998,40 -22.11507,0 -40,-17.885 -40,-40 0,-22.11492 17.88494,-40.00002 40,-40.00002 z m 0,6 c -5.4991,0 -10,4.5008 -10,10 1.1226,10.313 1.9264,20.6765 3,31.00002 0.0834,3.4215 2.6541,7.0656 7,7 4.3459,0.066 6.917,-3.5785 7,-7 1.0736,-10.32352 1.8774,-20.68702 2.999998,-31.00002 0,-5.4992 -4.500898,-10 -9.999998,-10 z m 0,4 c 3.316,0 5.966,2.6301 6,5.9375 -0.8838,10.3627 -2.1954,20.6948 -3,31.06252 0,1.6805 -1.3195,3 -3,3 -1.6805,0 -3,-1.3195 -3,-3 -0.8046,-10.36772 -2.1162,-20.69982 -3,-31.06252 0.0338,-3.3074 2.684,-5.9375 6,-5.9375 z m 0,48.00002 c -4.3946,0 -8,3.6054 -8,8 0,4.3946 3.6054,8 8,8 4.3946,0 8,-3.6054 8,-8 0,-4.3946 -3.6054,-8 -8,-8 z m 0,4 c 2.2328,0 4,1.7672 4,4 0,2.2328 -1.7672,4 -4,4 -2.2328,0 -4,-1.7672 -4,-4 0,-2.2328 1.7672,-4 4,-4 z" fill="red" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"/></g>
                </svg>
        </div>
        <p>${text}</p>
        <div class="close">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0" class="icon-failure-close">
                <path class="p1" d="m50 12.582c-20.625 0-37.418 16.793-37.418 37.418s16.793 37.418 37.418 37.418 37.418-16.793 37.418-37.418-16.793-37.418-37.418-37.418zm0 70.668c-18.332 0-33.25-14.918-33.25-33.25s14.918-33.25 33.25-33.25 33.25 14.918 33.25 33.25-14.918 33.25-33.25 33.25z" />
                <path class="p2" d="m61.73 38.27c-0.8125-0.8125-2.125-0.8125-2.9375 0l-8.793 8.793-8.793-8.793c-0.8125-0.8125-2.125-0.8125-2.9375 0s-0.8125 2.125 0 2.9375l8.793 8.793-8.793 8.793c-0.8125 0.8125-0.8125 2.125 0 2.9375 0.41797 0.41797 0.9375 0.60547 1.4805 0.60547s1.0625-0.20703 1.4805-0.60547l8.7695-8.793 8.793 8.793c0.41797 0.41797 0.9375 0.60547 1.4805 0.60547 0.54297 0 1.0625-0.20703 1.4805-0.60547 0.8125-0.8125 0.8125-2.125 0-2.9375l-8.8164-8.793 8.793-8.793c0.8125-0.8125 0.8125-2.125 0-2.9375z" />
            </svg>
        </div>
    
    `
    par.appendChild(toast);
    setTimeout(() => {
        toast.remove();
        if (par.children.length == 0) {
            par.remove()
        }
    }, 6000);
    const closeBtn = toast.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
}
