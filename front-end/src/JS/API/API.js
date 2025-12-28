/**
 * 
 * @param {*} dulieu : Dữ liệu gửi lên server ( FormData )
 * @param {*} yeucau : {
 *      url: Đường dẫn API,
 *      PhuongThuc: 1 (POST) | 2 (GET),
 *      token: Token (nếu có),
 *      fileArray: Mảng file (nếu có)
 * }
 * @returns 
 */
export async function CallAPI(dulieu = null, yeucau) {
    const URL = 'http://127.0.0.1:8000/';
    const DuongDan = URL + yeucau.url;
    let options = {};
    if (yeucau.fileArray) {
        if (dulieu === null) {
            dulieu = new FormData();
        }
        yeucau.fileArray.forEach(file => {
            dulieu.append("files", file);
        });
    }
    if (yeucau.PhuongThuc === 1) {
        options = {
            method: "POST",
            credentials: "include",
            headers: {},
            body: dulieu
        };
    }
    if (yeucau.PhuongThuc === 2) {
        options = {
            method: "GET",
            credentials: "include" 
        };
    }
    if (yeucau.token) {
        options.headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${yeucau.token}`
        };
    }

    try {
        const response = await fetch(DuongDan, options);
        //trả về lỗi trạng thái (*như 4xx, 5xx) dưới dạng đối tượng JSON có cấu trúc thống nhất
        if (!response.ok) {
            const errorText = await response.text();
            return {
                Status: false,
                message: `Lỗi HTTP ${response.status}: ${errorText.substring(0, 50)}...`
            };
        }

        return await response.json();
    } catch (error) {
        return {
            Status: false,
            message: "Không thể kết nối đến hệ thống, vui lòng thử lại sau!"
        };
    }
}
