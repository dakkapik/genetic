module.exports = function codify (err, code) {
    err.code = code
    return err
}