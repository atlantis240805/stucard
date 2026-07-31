# StuCard — Tạo thẻ học sinh

Công cụ tạo thẻ học sinh/sinh viên ngay trên trình duyệt: điền thông tin, chọn
ảnh chân dung và logo trường, rồi tải về file ảnh PNG để in. Mọi thứ chạy trên
máy bạn — ảnh không được gửi lên bất kỳ máy chủ nào.

## Tính năng

- Nhập tên, lớp, trường, mã số, ngày sinh và các trường thông tin trên thẻ.
- Tải ảnh chân dung và logo trường lên, xem trước thẻ theo thời gian thực.
- Xuất thẻ ra ảnh PNG độ phân giải cao, sẵn sàng đem in.
- Chạy hoàn toàn phía người dùng, không cần tài khoản, không gửi dữ liệu đi đâu.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở địa chỉ mà Vite in ra (mặc định http://localhost:5173).

Build bản tĩnh để đưa lên mạng:

```bash
npm run build
```

## Công nghệ

React 19, TypeScript, Vite. Giao diện dựng bằng [Astryx](https://www.npmjs.com/package/@astryxdesign/core)
với theme y2k. Xuất ảnh bằng `html-to-image` — ảnh chọn được nhúng thẳng dạng
data URL để bản xuất ra luôn đầy đủ, không bị lỗi ảnh trắng/đen khi chụp.

## Liên hệ

- Facebook: https://www.facebook.com/thien.phuc.450676/
- Telegram: https://t.me/Benedetta24k
