
const checkIp = async (req, res) => {
    const clientIp = '::1'
    console.log("headeres = ", req.headers);
    

    const IP = '192.168.43.153'

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