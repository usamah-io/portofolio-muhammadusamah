import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs(r"c:\portfolio-muhammadusamah\public\hackathon", exist_ok=True)

# Helper for font loading with fallback
def get_font(size=14, bold=False):
    try:
        font_path = "C:\\Windows\\Fonts\\segoeui.ttf" if not bold else "C:\\Windows\\Fonts\\segoeuib.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        try:
            font_path = "C:\\Windows\\Fonts\\arial.ttf" if not bold else "C:\\Windows\\Fonts\\arialbd.ttf"
            return ImageFont.truetype(font_path, size)
        except:
            return ImageFont.load_default()

def get_mono_font(size=14):
    try:
        return ImageFont.truetype("C:\\Windows\\Fonts\\consola.ttf", size)
    except:
        return get_font(size)

# ==========================================
# 1. GOOGLE SHEETS LEADERBOARD SCREENSHOT
# ==========================================
def draw_leaderboard():
    W, H = 1000, 620
    img = Image.new("RGB", (W, H), "#F8F9FA")
    d = ImageDraw.Draw(img)
    
    font_title = get_font(18, bold=True)
    font_menu = get_font(13)
    font_cell = get_font(15)
    font_cell_bold = get_font(15, bold=True)
    font_small = get_font(12)
    
    # Top Header Bar
    d.rectangle([0, 0, W, 110], fill="#F8F9FA")
    # Google Sheets icon square
    d.rounded_rectangle([25, 20, 55, 55], radius=6, fill="#0F9D58")
    d.rectangle([33, 28, 47, 47], fill="#FFFFFF")
    d.line([(36, 34), (44, 34)], fill="#0F9D58", width=2)
    d.line([(36, 38), (44, 38)], fill="#0F9D58", width=2)
    d.line([(36, 42), (44, 42)], fill="#0F9D58", width=2)
    
    # Spreadsheet Title & Controls
    d.text((68, 22), "REKAP PENILAIAN HACKATON GEMFES26", font=font_title, fill="#1F1F1F")
    d.text((440, 24), "⭐  ☁  👁", font=font_cell, fill="#5F6368")
    
    # Menu Items
    menus = ["File", "Edit", "Tampilan", "Sisipkan", "Format", "Data", "Alat", "Gemini", "Ekstensi", "Bantuan"]
    mx = 68
    for m in menus:
        d.text((mx, 48), m, font=font_menu, fill="#3C4043")
        mx += 46 if len(m) < 6 else 62
        
    # Toolbar background
    d.rectangle([0, 75, W, 110], fill="#EDF2FA")
    d.rounded_rectangle([260, 80, 420, 105], radius=12, fill="#D3E3FD")
    d.text((280, 84), "👁  Hanya lihat", font=get_font(13, bold=True), fill="#041E49")
    
    # Formula bar
    d.rectangle([0, 110, W, 140], fill="#FFFFFF")
    d.line([(0, 140), (W, 140)], fill="#E0E0E0", width=1)
    d.text((20, 117), "A1", font=font_cell_bold, fill="#3C4043")
    d.text((120, 117), "fx  Nama Tim", font=font_cell, fill="#5F6368")
    
    # Table Grid Setup
    start_y = 145
    col_a_w = 210
    col_b_w = 150
    row_h = 36
    
    # Row Headers
    d.rectangle([0, start_y, 40, start_y + row_h * 8], fill="#F1F3F4")
    d.rectangle([40, start_y, 40 + col_a_w + col_b_w, start_y + row_h], fill="#F1F3F4")
    
    # Col Letters
    d.text((40 + col_a_w//2 - 5, start_y + 8), "A", font=font_cell_bold, fill="#5F6368")
    d.text((40 + col_a_w + col_b_w//2 - 5, start_y + 8), "B", font=font_cell_bold, fill="#5F6368")
    
    # Header Cells (Nama Tim, Nilai Akhir) - Cyan Fill #00FFFF
    hy = start_y + row_h
    d.rectangle([40, hy, 40 + col_a_w, hy + row_h], fill="#00FFFF", outline="#000000", width=1)
    d.rectangle([40 + col_a_w, hy, 40 + col_a_w + col_b_w, hy + row_h], fill="#00FFFF", outline="#000000", width=1)
    
    d.text((40 + 40, hy + 8), "Nama Tim", font=font_cell_bold, fill="#000000")
    d.text((40 + col_a_w + 35, hy + 8), "Nilai Akhir", font=font_cell_bold, fill="#000000")
    
    # Data Rows
    data = [
        ("Prompt Engineers", "89,7", False),
        ("aalitan cees", "88,9", False),
        ("Learnova", "88,3", False),
        ("Sks-Master", "86,4", True), # Highlighted
        ("Trias Nomal", "86,2", False)
    ]
    
    curr_y = hy + row_h
    for r_idx, (team, score, is_highlight) in enumerate(data, start=2):
        # Row number
        d.text((15, curr_y + 8), str(r_idx), font=font_small, fill="#5F6368")
        
        # Row Fill
        fill_col = "#E8F0FE" if is_highlight else "#FFFFFF"
        
        d.rectangle([40, curr_y, 40 + col_a_w, curr_y + row_h], fill=fill_col, outline="#000000", width=1)
        d.rectangle([40 + col_a_w, curr_y, 40 + col_a_w + col_b_w, curr_y + row_h], fill=fill_col, outline="#000000", width=1)
        
        f_use = font_cell_bold if is_highlight else font_cell
        t_col = "#1A73E8" if is_highlight else "#000000"
        
        d.text((40 + 12, curr_y + 8), team, font=f_use, fill=t_col)
        d.text((40 + col_a_w + 55, curr_y + 8), score, font=f_use, fill=t_col)
        
        curr_y += row_h

    # Extra empty grid lines
    for i in range(7, 12):
        d.text((15, curr_y + 8), str(i), font=font_small, fill="#5F6368")
        d.rectangle([40, curr_y, 40 + col_a_w, curr_y + row_h], fill="#FFFFFF", outline="#E0E0E0", width=1)
        d.rectangle([40 + col_a_w, curr_y, 40 + col_a_w + col_b_w, curr_y + row_h], fill="#FFFFFF", outline="#E0E0E0", width=1)
        curr_y += row_h
        
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\leaderboard.png")
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\teamwork.jpg")

# ==========================================
# 2. GOOGLE SHEETS DETAILED CRITERIA SCREENSHOT
# ==========================================
def draw_criteria():
    W, H = 1000, 620
    img = Image.new("RGB", (W, H), "#F8F9FA")
    d = ImageDraw.Draw(img)
    
    font_title = get_font(18, bold=True)
    font_menu = get_font(13)
    font_cell = get_font(14)
    font_cell_bold = get_font(14, bold=True)
    font_small = get_font(12)
    
    # Top Header Bar
    d.rectangle([0, 0, W, 110], fill="#F8F9FA")
    d.rounded_rectangle([25, 20, 55, 55], radius=6, fill="#0F9D58")
    d.rectangle([33, 28, 47, 47], fill="#FFFFFF")
    d.line([(36, 34), (44, 34)], fill="#0F9D58", width=2)
    d.line([(36, 38), (44, 38)], fill="#0F9D58", width=2)
    d.line([(36, 42), (44, 42)], fill="#0F9D58", width=2)
    
    d.text((68, 22), "REKAP PENILAIAN HACKATON GEMFES26", font=font_title, fill="#1F1F1F")
    d.text((440, 24), "⭐  ☁  👁", font=font_cell, fill="#5F6368")
    
    menus = ["File", "Edit", "Tampilan", "Sisipkan", "Format", "Data", "Alat", "Gemini", "Ekstensi", "Bantuan"]
    mx = 68
    for m in menus:
        d.text((mx, 48), m, font=font_menu, fill="#3C4043")
        mx += 46 if len(m) < 6 else 62
        
    d.rectangle([0, 75, W, 110], fill="#EDF2FA")
    d.rounded_rectangle([260, 80, 420, 105], radius=12, fill="#D3E3FD")
    d.text((280, 84), "👁  Hanya lihat", font=get_font(13, bold=True), fill="#041E49")
    
    start_y = 120
    col_a = 340
    col_b = 65
    col_c = 65
    col_d = 70
    col_e = 95
    row_h = 36
    
    # Table Header Row
    hy = start_y
    d.rectangle([40, hy, 40 + col_a, hy + row_h], fill="#D9E1F2", outline="#000000", width=1)
    d.rectangle([40 + col_a, hy, 40 + col_a + col_b, hy + row_h], fill="#D9E1F2", outline="#000000", width=1)
    d.rectangle([40 + col_a + col_b, hy, 40 + col_a + col_b + col_c, hy + row_h], fill="#D9E1F2", outline="#000000", width=1)
    d.rectangle([40 + col_a + col_b + col_c, hy, 40 + col_a + col_b + col_c + col_d, hy + row_h], fill="#D9E1F2", outline="#000000", width=1)
    d.rectangle([40 + col_a + col_b + col_c + col_d, hy, 40 + col_a + col_b + col_c + col_d + col_e, hy + row_h], fill="#D9E1F2", outline="#000000", width=1)
    
    d.text((40 + 80, hy + 8), "Kriteria Penilaian", font=font_cell_bold, fill="#000000")
    d.text((40 + col_a + 12, hy + 8), "Bobot", font=font_cell_bold, fill="#000000")
    d.text((40 + col_a + col_b + 14, hy + 8), "Skor", font=font_cell_bold, fill="#000000")
    d.text((40 + col_a + col_b + col_c + 8, hy + 8), "Catatan", font=font_cell_bold, fill="#000000")
    d.text((40 + col_a + col_b + col_c + col_d + 10, hy + 8), "Nilai Bobot", font=font_cell_bold, fill="#000000")
    
    rows = [
        ("Inovasi dan Kebaruan", "30%", "85", "", "25,5"),
        ("Relevansi SDGs dan Dampak Sosial", "30%", "85", "", "25,5"),
        ("Feasibility/Kelayakan Implementasi AI", "20%", "88", "", "17,6"),
        ("Kualitas Pitching", "20%", "88", "", "17,6"),
    ]
    
    curr_y = hy + row_h
    for r_title, bobot, skor, cat, nilai in rows:
        d.rectangle([40, curr_y, 40 + col_a, curr_y + row_h], fill="#FFFFFF", outline="#000000", width=1)
        d.rectangle([40 + col_a, curr_y, 40 + col_a + col_b, curr_y + row_h], fill="#FFFFFF", outline="#000000", width=1)
        d.rectangle([40 + col_a + col_b, curr_y, 40 + col_a + col_b + col_c, curr_y + row_h], fill="#FFFFFF", outline="#000000", width=1)
        d.rectangle([40 + col_a + col_b + col_c, curr_y, 40 + col_a + col_b + col_c + col_d, curr_y + row_h], fill="#FFFFFF", outline="#000000", width=1)
        d.rectangle([40 + col_a + col_b + col_c + col_d, curr_y, 40 + col_a + col_b + col_c + col_d + col_e, curr_y + row_h], fill="#FFFFFF", outline="#000000", width=1)
        
        d.text((40 + 10, curr_y + 8), r_title, font=font_cell, fill="#000000")
        d.text((40 + col_a + 15, curr_y + 8), bobot, font=font_cell, fill="#000000")
        d.text((40 + col_a + col_b + 20, curr_y + 8), skor, font=font_cell, fill="#000000")
        d.text((40 + col_a + col_b + col_c + col_d + 30, curr_y + 8), nilai, font=font_cell, fill="#000000")
        curr_y += row_h
        
    # Yellow Total Row (#FFFF00)
    tot_w = col_a + col_b + col_c + col_d
    d.rectangle([40, curr_y, 40 + tot_w, curr_y + row_h], fill="#FFFF00", outline="#000000", width=1)
    d.rectangle([40 + tot_w, curr_y, 40 + tot_w + col_e, curr_y + row_h], fill="#FFFF00", outline="#000000", width=1)
    
    d.text((40 + 130, curr_y + 8), "Nilai Akhir", font=font_cell_bold, fill="#000000")
    d.text((40 + tot_w + 30, curr_y + 8), "86,2", font=font_cell_bold, fill="#000000")
    
    curr_y += row_h * 2
    d.text((260, curr_y), "Nilai Bobot  :  Skor x Persentase Bobot", font=font_cell_bold, fill="#000000")
    d.text((260, curr_y + 30), "Nilai Akhir   :  Jumlah Nilai Bobot", font=font_cell_bold, fill="#000000")
    
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\rincian-nilai.png")
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\scorecard.jpg")

# ==========================================
# 3. WHATSAPP ANNOUNCEMENT SCREENSHOT
# ==========================================
def draw_whatsapp():
    W, H = 1000, 620
    img = Image.new("RGB", (W, H), "#E5DDD5")
    d = ImageDraw.Draw(img)
    
    font_head = get_font(15, bold=True)
    font_sub = get_font(12)
    font_msg = get_font(13)
    font_bold = get_font(13, bold=True)
    
    # Top Header Bar (WhatsApp Web)
    d.rectangle([0, 0, W, 60], fill="#F0F2F5")
    d.ellipse([20, 10, 50, 40], fill="#00A884")
    d.text((65, 12), "Lomba Hackathon", font=font_head, fill="#111B21")
    d.text((65, 34), "Bg, +62 822-1643-8083, +62 877-2374-7152, +62 853-1468-6096...", font=font_sub, fill="#667781")
    d.text((W - 100, 18), "📹  🔍  ⋮", font=font_head, fill="#54656F")
    
    # Chat Bubble Container
    bubble_x = 40
    bubble_y = 80
    bubble_w = 600
    bubble_h = 500
    
    d.rounded_rectangle([bubble_x, bubble_y, bubble_x + bubble_w, bubble_y + bubble_h], radius=12, fill="#FFFFFF")
    
    # Message sender
    d.text((bubble_x + 20, bubble_y + 15), "~ Gesa Febrina Gesvania", font=font_bold, fill="#D9406B")
    d.text((bubble_x + bubble_w - 140, bubble_y + 15), "+62 821-2657-8057", font=font_sub, fill="#667781")
    
    lines = [
        ("PENGUMUMAN FINALIS GEMINI INNOVATION HACKATHON", True),
        ("", False),
        ("Halo, Innovators!", False),
        ("", False),
        ("Terima kasih kepada seluruh tim yang telah berpartisipasi dan mengirimkan ide terbaiknya", False),
        ("pada Gemini Innovation Hackathon. Setelah melalui proses seleksi administrasi dan penilaian,", False),
        ("dewan juri telah menetapkan 5 tim yang berhak melaju ke babak Final Pitch. Berikut tim yang", False),
        ("lolos (disusun berdasarkan abjad bukan nilai):", False),
        ("  1.  aalitan cees", False),
        ("  2.  Learnova", False),
        ("  3.  Prompt Engineers", False),
        ("  4.  Sks-Master", True), # Highlighted
        ("  5.  Trias Normal", False),
        ("🎉 Selamat kepada seluruh tim yang berhasil lolos!", False),
        ("", False),
        ("📢 Informasi Tahap Presentasi", True),
        ("Seluruh tim finalis diharapkan mempersiapkan slide presentasi (PowerPoint/PDF) dan", False),
        ("memastikan seluruh anggota memahami solusi yang diajukan.", False),
        ("", False),
        ("Hari, Tanggal: Sabtu, 26 Juli 2026", False),
        ("Pelaksanaan: Online (link meeting akan diinformasikan kemudian)", False),
    ]
    
    cy = bubble_y + 40
    for txt, is_b in lines:
        f_to_use = font_bold if is_b else font_msg
        col_to_use = "#00A884" if is_b and "Sks-Master" in txt else "#111B21"
        d.text((bubble_x + 20, cy), txt, font=f_to_use, fill=col_to_use)
        cy += 20
        
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\pengumuman-wa.png")
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\demo.jpg")

# ==========================================
# 4. SYSTEM ARCHITECTURE DIAGRAM SCREENSHOT
# ==========================================
def draw_architecture():
    W, H = 1000, 620
    img = Image.new("RGB", (W, H), "#FFFFFF")
    d = ImageDraw.Draw(img)
    
    font_box = get_font(13, bold=True)
    font_sub = get_font(11)
    
    # Outer Container Box: Sisi Server
    d.rectangle([340, 40, 880, 460], outline="#555555", width=2)
    d.text((355, 52), "Sisi Server", font=font_sub, fill="#555555")
    
    # User / HP / Laptop
    d.rounded_rectangle([40, 400, 200, 440], radius=20, outline="#333333", width=2)
    d.text((65, 412), "Pengguna / HP / Laptop", font=font_box, fill="#333333")
    
    # Step 1 & 6
    d.rectangle([60, 500, 200, 530], outline="#CCCCCC", width=1)
    d.text((70, 508), "1. Pilih Kuis & Kesulitan", font=font_sub, fill="#555555")
    
    d.rectangle([210, 500, 350, 530], outline="#CCCCCC", width=1)
    d.text((215, 508), "6. Kirim Soal & Opsi Teracak", font=font_sub, fill="#555555")
    
    # Frontend React Box
    d.rectangle([50, 560, 320, 600], outline="#333333", width=2)
    d.text((65, 572), "Frontend React: app/dashboard/page.js", font=font_box, fill="#111111")
    
    # Sisi Server inner items
    d.rectangle([380, 170, 585, 220], outline="#333333", width=2)
    d.text((395, 188), "shuffleQuestionOptions Helper", font=font_box, fill="#111111")
    
    # Diamond API Key
    d.polygon([(700, 110), (760, 160), (700, 210), (640, 160)], outline="#333333", width=2)
    d.text((665, 153), "API Key Aktif?", font=font_box, fill="#111111")
    
    d.rectangle([545, 390, 665, 430], outline="#333333", width=2)
    d.text((560, 402), "Gemini 2.5 API", font=font_box, fill="#111111")
    
    d.rectangle([690, 390, 860, 430], outline="#333333", width=2)
    d.text((705, 402), "Bank Soal Offline Lokal", font=font_box, fill="#111111")
    
    # Server Action Box
    d.rectangle([530, 720 - 180, 735, 760 - 180], outline="#333333", width=2)
    d.text((545, 732 - 180), "Server Action: app/actions.js", font=font_box, fill="#111111")
    
    # LocalStorage Cylinder
    d.rounded_rectangle([20, 740 - 180, 260, 780 - 180], radius=15, outline="#333333", width=2)
    d.text((35, 752 - 180), "LocalStorage: sks_master_history", font=font_box, fill="#111111")
    
    # Connective arrows
    d.line([(120, 440), (120, 560)], fill="#1B72E8", width=2)
    d.line([(550, 430), (550, 540)], fill="#1B72E8", width=2)
    d.line([(775, 430), (775, 540)], fill="#1B72E8", width=2)
    
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\arsitektur-sistem.png")
    img.save(r"c:\portfolio-muhammadusamah\public\hackathon\pitching.jpg")

if __name__ == "__main__":
    draw_leaderboard()
    draw_criteria()
    draw_whatsapp()
    draw_architecture()
    print("All 4 authentic screenshot images rendered successfully!")
