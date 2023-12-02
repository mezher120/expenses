export function calculation(data) {


    console.log(data)
    data.sort((a, b) => {
        return b.price - a.price;
    })
    console.log(data)
    
    let total = 0;
    data.map(chico => total = total + chico.price)
    
    let average = total / data.length;
    
    for (let i = 0; i < data.length; i++) {
        data[i].deuda = data[i].price - average;
    }
    
    
    let l = 0;
    let r = data.length - 1;
    
    let sum = 0;
    let result = []
    while (l < r) {
    
        if (data[l].deuda > 0) {
            console.log(data[l].deuda, data[r].deuda)
            if (data[l].deuda + data[r].deuda >= 0) {
                result.push({
                    deudor: data[r].name,
                    acreedor: data[l].name,
                    importe: (data[r].deuda).toFixed(2),
                    alias: data[l].alias
                })
                data[l].deuda = data[l].deuda + data[r].deuda;
                data[r].deuda = data[r].deuda + average > 0 ? 0 : data[r].deuda + average;
                console.log('uno')
                r--;
            } else {
                result.push({
                    deudor: data[r].name,
                    acreedor: data[l].name,
                    importe: (data[l].deuda * -1).toFixed(2),
                    alias: data[l].alias
                })
                data[r].deuda = data[r].deuda + data[l].deuda;
                data[l].deuda = 0;
                l++;
            }
        } else {
            r--;
        }
    
    }
    console.log(data)
    console.log(result)
    return result

}
