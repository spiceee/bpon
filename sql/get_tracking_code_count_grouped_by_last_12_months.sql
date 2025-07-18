SELECT
    DATE_TRUNC('month', date_of_postage) AS month,
    COUNT(*) AS occurrences
FROM
    tracking_codes
WHERE
    date_of_postage IS NOT NULL
    AND date_of_postage >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
GROUP BY
    DATE_TRUNC('month', date_of_postage)
ORDER BY
    month
