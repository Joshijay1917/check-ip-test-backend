
const checkIp = async (req, res) => {
    const clientIp = req.headers['cf-connecting-ip'] || '::1'
    console.log("headeres = ", req.headers);
//     headeres =  {
//   host: 'check-ip-test-backend.onrender.com',
//   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0',
//   accept: '*/*',
//   'accept-encoding': 'gzip, br',
//   'accept-language': 'en-US,en;q=0.9',
//   'cdn-loop': 'cloudflare; loops=1',
//   'cf-connecting-ip': '157.32.44.199',
//   'cf-ipcountry': 'IN',
//   'cf-ray': '97e086140968424e-SEA',
//   'cf-visitor': '{"scheme":"https"}',
//   origin: 'https://gps-tracker-check.vercel.app',
//   priority: 'u=1, i',
//   referer: 'https://gps-tracker-check.vercel.app/',
//   'render-proxy-ttl': '4',
//   'rndr-id': 'a699c54b-0eb6-4365',
//   'sec-ch-ua': '"Not;A=Brand";v="99", "Microsoft Edge";v="139", "Chromium";v="139"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"Windows"',
//   'sec-fetch-dest': 'empty',
//   'sec-fetch-mode': 'cors',
//   'sec-fetch-site': 'cross-site',
//   'true-client-ip': '157.32.44.199',
//   'x-forwarded-for': '157.32.44.199, 172.71.150.104, 10.214.109.200',
//   'x-forwarded-proto': 'https',
//   'x-request-start': '1757691840801993'
// }
    
    

    // const IP = '192.168.43.153'
    const IP = '157.32.44.199'

    res
    .status(200)
    .json(
        {
            "ip": req.ip,
            "clientIp": clientIp,
            "access": clientIp == IP ? true : false
        }
    )
}

export { checkIp }