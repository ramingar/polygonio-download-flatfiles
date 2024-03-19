export default {
    synchronous: true,
    path       : '/path/to/folder/',    // with trailing slash
    command    : 'aws s3 cp s3://flatfiles/us_stocks_sip/minute_aggs_v1/<YYYY>/<MM>/<YYYY>-<MM>-<DD>.csv.gz <PATH><YYYY>-<MM>-<DD>-minute_aggs.csv.gz --endpoint-url https://files.polygon.io'
}