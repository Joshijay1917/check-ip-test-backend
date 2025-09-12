
const checkIp = async (req, res) => {
    const clientIp = req.ip || req.connection.remoteAddress;

    const IP = '192.168.43.153'

    res
    .status(200)
    .json(
        {
            "ip": req.ip,
            "connection": req.connection.remoteAddress,
            "clientIp": clientIp,
            "access": clientIp == IP ? true : false
        }
    )
}

export { checkIp }