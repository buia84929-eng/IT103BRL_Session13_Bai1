var danhSachVe = [
    {
        maPNR: "VN001",
        tenKhach: "Nguyen Van An",
        chuyenBay: "VN123",
        hangVe: "ECONOMY",
        trangThai: "BOOKED"
    },
    {
        maPNR: "VN002",
        tenKhach: "Tran Thi Binh",
        chuyenBay: "VN456",
        hangVe: "BUSINESS",
        trangThai: "BOOKED"
    },
    {
        maPNR: "VN003",
        tenKhach: "Le Van Cuong",
        chuyenBay: "VN789",
        hangVe: "ECONOMY",
        trangThai: "BOOKED"
    }
];

function findTicketByPnr(maPNR) {
    for (var i = 0; i < danhSachVe.length; i++) {
        if (danhSachVe[i].maPNR === maPNR) {
            return danhSachVe[i];
        }
    }
    return null;
}

function listTickets() {
    console.log("DANH SACH VE MAY BAY");
    console.table(danhSachVe);
}

function calculateExcessBaggageFee(hangVe, canNang) {
    var gioiHan = 20;

    if (hangVe === "BUSINESS") {
        gioiHan = 30;
    }

    if (canNang > gioiHan) {
        return (canNang - gioiHan) * 50000;
    }

    return 0;
}

function displayBoardingPass(ve, canNang, phi) {
    console.log("===== BOARDING PASS =====");
    console.log("Ma PNR: " + ve.maPNR);
    console.log("Hanh khach: " + ve.tenKhach);
    console.log("Chuyen bay: " + ve.chuyenBay);
    console.log("Hang ve: " + ve.hangVe);
    console.log("Hanh ly: " + canNang + " kg");
    console.log("Phi qua can: " + phi + " VND");
    console.log("Trang thai: " + ve.trangThai);
    console.log("=========================");
}

function checkIn() {
    var maPNR = prompt("Nhap ma PNR:");

    if (maPNR === null || maPNR.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    maPNR = maPNR.trim().toUpperCase();

    var ve = findTicketByPnr(maPNR);

    if (ve === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ve.trangThai !== "BOOKED") {
        console.log("Ve da check-in hoac da huy!");
        return;
    }

    var nhapCanNang = prompt("Nhap can nang hanh ly (kg):");

    if (nhapCanNang === null || nhapCanNang.trim() === "") {
        console.log("Can nang khong hop le!");
        return;
    }

    var canNang = Number(nhapCanNang);

    if (isNaN(canNang) || canNang < 0) {
        console.log("Can nang phai la so khong am!");
        return;
    }

    var phi = calculateExcessBaggageFee(ve.hangVe, canNang);

    ve.trangThai = "CHECKED_IN";

    console.log("Check-in thanh cong!");
    displayBoardingPass(ve, canNang, phi);
}

function searchTicket() {
    var tuKhoa = prompt("Nhap ma PNR hoac ten khach:");

    if (tuKhoa === null || tuKhoa.trim() === "") {
        console.log("Thong tin khong hop le!");
        return;
    }

    tuKhoa = tuKhoa.trim().toLowerCase();
    var timThay = false;

    for (var i = 0; i < danhSachVe.length; i++) {
        var ve = danhSachVe[i];

        if (ve.maPNR.toLowerCase() === tuKhoa ||
            ve.tenKhach.toLowerCase().indexOf(tuKhoa) !== -1) {
            console.log(ve);
            timThay = true;
        }
    }

    if (timThay === false) {
        console.log("Khong tim thay ve!");
    }
}

function cancelTicket() {
    var maPNR = prompt("Nhap ma PNR can huy:");

    if (maPNR === null || maPNR.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    var ve = findTicketByPnr(maPNR.trim().toUpperCase());

    if (ve === null) {
        console.log("Khong tim thay ve!");
    } else if (ve.trangThai === "CANCELLED") {
        console.log("Ve da duoc huy truoc do!");
    } else if (ve.trangThai === "CHECKED_IN") {
        console.log("Ve da check-in, khong the huy!");
    } else {
        ve.trangThai = "CANCELLED";
        console.log("Huy ve thanh cong!");
    }
}

function main() {
    var luaChon;

    do {
        console.log("MENU QUAN LY VE MAY BAY");
        console.log("1. Xem danh sach ve");
        console.log("2. Check-in hanh khach");
        console.log("3. Tra cuu ve");
        console.log("4. Huy ve");
        console.log("5. Thoat");

        luaChon = prompt("Nhap lua chon:");

        switch (luaChon) {
            case "1":
                listTickets();
                break;
            case "2":
                checkIn();
                break;
            case "3":
                searchTicket();
                break;
            case "4":
                cancelTicket();
                break;
            case "5":
                console.log("Thoat chuong trinh");
                break;
            default:
                console.log("Lua chon khong hop le");
        }
    } while (luaChon !== "5" && luaChon !== null);
}

main();