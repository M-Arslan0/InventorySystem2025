const BASE_URL = "http://localhost:5000";

export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res;
    let data;
    let status;

    switch (method) {
        case 'GET':
            res = await fetch(BASE_URL + url, {
                headers,
                credentials: "include"
            });
            status = res.status;
            data = await res.json();
            return { data, status };

        case 'POST':
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, {
                    headers,
                    method,
                    body,
                    credentials: "include"
                });
                data = await res.json();
            } else {
                res = await fetch(BASE_URL + url, {
                    headers,
                    method,
                    body: JSON.stringify({ ...body }),
                    credentials: "include"
                });
                data = await res.json();
                status = res.status;
            }
            return { data, status };

        case 'PUT':
            res = await fetch(BASE_URL + url, {
                headers,
                method,
                body: JSON.stringify(body),
                credentials: "include"
            });
            status = res.status;
            if (status !== 200 && status !== 201) throw new Error("ERROR");
            data = await res.json();
            return { data, status };

        case 'DELETE':
            res = await fetch(BASE_URL + url, {
                headers,
                method,
                credentials: "include"
            });
            data = await res.json();
            status = res.status;
            return { data, status };

        default:
            return;
    }
};
