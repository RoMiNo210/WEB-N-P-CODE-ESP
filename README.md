# NẠP CODE ESP — DARK ESP

Bản web tĩnh gồm thư viện mã nguồn mở cho ESP8266/ESP32 (35 dự án), bộ lọc theo dòng chip/danh mục, sắp xếp, ô dán code, chọn file BIN để xem thông tin cục bộ và kiểm tra khả năng Web Serial (USB).

## Chạy
- Giải nén thư mục.
- Mở terminal tại thư mục này và chạy `python -m http.server 8000`.
- Truy cập `http://localhost:8000`.
- Có thể triển khai toàn bộ thư mục lên GitHub Pages/Netlify/hosting tĩnh (không cần backend).

## Tính năng
- Tìm kiếm theo tên, mô tả, dòng chip, danh mục.
- Lọc theo dòng ESP và danh mục; sắp xếp theo tên, danh mục, hoặc ưu tiên nguồn chính thức.
- Mỗi thẻ dự án hiển thị: dòng chip hỗ trợ, danh mục, giấy phép, nhãn "CHÍNH THỨC" cho repo do Espressif/Arduino/Adafruit/MicroPython duy trì.
- Nút "SAO CHÉP LỆNH CLONE" copy sẵn lệnh `git clone <repo>.git`.
- Ô dán code Arduino/C++ + nút sao chép; chọn file `.bin` để xem tên/dung lượng cục bộ (không upload đi đâu).
- Kiểm tra nhanh trình duyệt có hỗ trợ Web Serial API hay không.

## Danh mục hiện có
Framework, Dev Tools, Smart Home, LED, Python, Connectivity, Bluetooth, IoT Cloud, Camera, GUI / Display, Audio, Libraries, Web Server, OTA.

Một số dự án tiêu biểu đã thêm: PlatformIO Core, ESPEasy, OpenMQTTGateway, esp-homekit, FastLED, Adafruit NeoPixel, WiFiManager, AutoConnect, NimBLE-Arduino, ESP32-BLE-Keyboard, Blynk Library, esp32-camera, LVGL, TFT_eSPI, openHASP, ESP8266Audio, ESP32-audioI2S, IRremoteESP8266, ElegantOTA — cùng các dự án chính thức của Espressif (ESP-IDF, Arduino-ESP32, ESP-AT, ESP RainMaker, ESP IoT Solution).

## Thêm dự án mới
Mở `catalog.json` và thêm một object theo mẫu:
```json
{
  "name": "Tên dự án",
  "chips": ["ESP32"],
  "category": "Libraries",
  "desc": "Mô tả ngắn gọn.",
  "url": "https://github.com/owner/repo",
  "license": "MIT",
  "official": false
}
```

## Giới hạn
- Đây là bản thư viện/chuẩn bị firmware, KHÔNG thực hiện ghi flash hoặc biên dịch code.
- File `.ino`, `.cpp`, YAML cần build thành firmware tương thích trước khi nạp.
- Android 11 hỗ trợ USB-Serial không đồng nhất; trình duyệt có thể không cung cấp Web Serial.
- Chỉ lấy firmware từ nguồn tin cậy, kiểm tra model, flash size, partition và giấy phép.
- Danh mục hiện có các dự án phổ biến, không phải toàn bộ Internet; bổ sung mục mới trong `catalog.json`.
- Các dự án và tên thương hiệu thuộc chủ sở hữu tương ứng. Kiểm tra license của từng repo trước khi phân phối.
