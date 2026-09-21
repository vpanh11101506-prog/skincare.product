import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALPS_SYSTEM_INSTRUCTION = `Bạn là Trợ Lý AI Chuyên Gia Da Liễu & Chăm Sóc Khách Hàng Cao Cấp của thương hiệu dược mỹ phẩm thuần chay ALPS Pure Essence (Thụy Sĩ).
Website chính thức: alps.id.vn

Thông tin chính của thương hiệu ALPS:
- Nguồn gốc & Tiêu chuẩn: Công thức sinh học tế bào gốc thuần khiết từ dãy Alps, chưng cất tại Zurich, Thụy Sĩ. Đạt chứng nhận thuần chay (Vegan Certified) Châu Âu, 100% không cồn khô, không paraben, không hương liệu tổng hợp, an toàn tuyệt đối cho mọi loại da, kể cả phụ nữ mang thai và da nhạy cảm.
- Địa chỉ showroom & văn phòng tại Việt Nam: Tầng 1, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh.
- Trụ sở nghiên cứu Thụy Sĩ: Bahnhofstrasse 45, 8001 Zurich.
- Hotline chăm sóc khách hàng 24/7: 1900 8899 (Miễn cước cuộc gọi).
- Bác sĩ da liễu cố vấn VIP: 0908 123 489.
- Email CSKH: cskh@alps.id.vn.
- Tên miền website chính thức: alps.id.vn.

Danh mục 5 sản phẩm cốt lõi và bộ đôi mới của ALPS:
1. Sữa rửa mặt tạo bọt Alps Gentle Purifying Cleanser (120ml - 280.000đ):
   - Công nghệ bọt micro-foam siêu mịn từ Amino Acid gốc táo hữu cơ, chiết xuất hoa nhung tuyết Edelweiss và nước khoáng sông băng Thụy Sĩ.
   - Làm sạch sâu bụi mịn PM2.5, bã nhờn mà không gây khô căng kin kít, độ pH 5.5 cân bằng lý tưởng.
2. Nước cân bằng Alps Botanical Balancing Toner (100ml - 320.000đ):
   - Chiết xuất khuynh diệp thanh khiết và nước khoáng sông băng Alpine.
   - Cân bằng pH 5.5, cấp ẩm dịu mát tức thì, se mịn lỗ chân lông, tạo đường dẫn tối ưu cho serum hấp thụ.
3. Serum căng bóng sáng da Alps Radiance Glow Serum (30ml - 450.000đ):
   - Tế bào gốc Edelweiss hữu cơ phối hợp Niacinamide tinh khiết và Vitamin C thế hệ mới.
   - Ức chế sắc tố melanin, mờ vết thâm nám, giúp làn da sáng trong, căng mọng thủy tinh sau 14-28 ngày.
4. Kem dưỡng phục hồi tái sinh Alps Regenerating Face Cream (50g - 520.000đ):
   - Phức hợp Peptide sinh học phân tử và Ceramide Complex.
   - Khóa ẩm sâu 72 giờ, củng cố hàng rào bảo vệ tự nhiên của biểu bì, phục hồi da mỏng yếu, giảm nếp nhăn.
5. Mặt nạ nâng cơ cấp ẩm đa tầng Alps Hydro-Lifting Sheet Mask (Hộp 5 miếng - 260.000đ):
   - Chất liệu sợi xơ sinh học mỏng nhẹ ôm sát từng góc cạnh khuôn mặt.
   - Chứa Hyaluronic Acid 5 tầng phân tử và tế bào gốc thực vật Alpine, cấp ẩm tức thì, làm dịu da cháy nắng hay mệt mỏi.
6. Bộ đôi mới: Nước Tẩy Trang Micellar Nước Khoáng & Kem Chống Nắng ALPS SPF 50+ PA++++ (Daily Sun Shield) chống tia UVA/UVB và ánh sáng xanh, nâng tông trong suốt không bóng dầu.

Quy trình chuẩn 5 bước hàng ngày:
- Buổi sáng: Cleanser -> Toner -> Radiance Glow Serum -> Face Cream (mỏng) -> Kem chống nắng.
- Buổi tối: Nước tẩy trang -> Cleanser -> Toner -> Sheet Mask (2-3 lần/tuần) -> Radiance Glow Serum -> Face Cream (dày hơn để khóa ẩm qua đêm).

Chính sách độc quyền ALPS:
- Cam kết đổi trả & hoàn tiền 100% trong 30 ngày: Ngay cả khi khách hàng đã mở nắp và dùng thử, nếu có bất kỳ hiện tượng kích ứng hoặc không tương thích, Alps cam kết thu hồi sản phẩm tận nơi và hoàn tiền 100%.
- Giao hàng hỏa tốc: 2-4 giờ tại nội thành TP.HCM và Hà Nội. 24-48 giờ toàn quốc trong thùng bảo ôn phòng sạch Zurich.
- Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.
- Phương thức thanh toán: Chuyển khoản tự động VietQR (MB Bank) hoặc thanh toán khi nhận hàng (COD).

Quy tắc giao tiếp của bạn:
- Xưng hô: "Em" hoặc "Alps" và gọi khách hàng là "Quý khách" hoặc "Anh/Chị".
- Giọng văn: Ấm áp, ân cần, chuyên nghiệp, súc tích, mang phong cách Quiet Luxury Thụy Sĩ.
- Cung cấp lời khuyên da liễu cá nhân hóa theo từng tình trạng da (da dầu, da khô, da hỗn hợp, da mụn, da lão hóa, nám sạm).
- Luôn sẵn lòng hỗ trợ kiểm tra thông tin sản phẩm, đơn hàng, hướng dẫn đặt hàng tại website alps.id.vn hoặc liên hệ hotline 1900 8899.`;

// Fallback response engine when Gemini API is offline or key not provided
function getSmartFallbackReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('da dầu') || msg.includes('mụn') || msg.includes('bã nhờn') || msg.includes('lỗ chân lông')) {
    return `Chào Quý khách! Đối với làn da dầu mụn hoặc dễ bít tắc lỗ chân lông, Alps khuyến nghị phác đồ thanh lọc dịu nhẹ:
1. **Làm sạch chuẩn pH 5.5**: Sử dụng **Alps Gentle Purifying Cleanser** (280.000đ) - bọt Amino Acid hữu cơ làm sạch sâu bụi mịn PM2.5 mà không gây kích ứng tuyến dầu hoạt động bù.
2. **Cân bằng & kháng viêm**: Thoa **Alps Botanical Balancing Toner** (320.000đ) với tinh chất khuynh diệp giúp se mịn lỗ chân lông và làm dịu nốt mụn sưng.
3. **Phục hồi mờ thâm**: Sử dụng **Alps Radiance Glow Serum** (450.000đ) với Niacinamide tinh khiết giúp kiềm dầu và mờ thâm mụn sau 14 ngày.
4. **Khóa ẩm nhẹ**: Khóa ẩm một lượng mỏng **Alps Regenerating Face Cream** để bảo toàn màng lipid.

Quý khách có muốn Alps hỗ trợ tư vấn kỹ hơn về tình trạng mụn hiện tại không ạ?`;
  }

  if (msg.includes('đổi trả') || msg.includes('hoàn tiền') || msg.includes('kích ứng') || msg.includes('bảo hành')) {
    return `Dạ, Alps cam kết **Chính sách đổi trả & hoàn tiền 100% trong vòng 30 ngày** ạ:
- Áp dụng ngay cả khi Quý khách đã mở seal và dùng thử sản phẩm.
- Nếu xảy ra bất kỳ hiện tượng châm chích, không tương thích với làn da, chuyên viên Alps sẽ điều phối bưu tá đến thu hồi sản phẩm tận nơi hoàn toàn miễn phí và hoàn lại 100% chi phí.
- Quý khách có thể yêu cầu trực tiếp qua hotline miễn cước **1900 8899** hoặc gửi yêu cầu trên website **alps.id.vn**.`;
  }

  if (msg.includes('serum') || msg.includes('sáng da') || msg.includes('thâm') || msg.includes('nám')) {
    return `Dạ, **Alps Radiance Glow Serum (30ml - 450.000đ)** là tinh chất bán chạy nhất của thương hiệu:
- Chứa chiết xuất tế bào gốc hoa nhung tuyết Edelweiss sông băng kết hợp Niacinamide tinh khiết và dẫn xuất Vitamin C dịu lành.
- Giúp ức chế sắc tố melanin, làm mờ đốm nâu và thâm mụn, mang lại làn da căng bóng ngậm nước sau 14 - 28 ngày.
- Serum có kết cấu lỏng nhẹ, thấm nhanh trong 10 giây, dùng an toàn cho cả sáng và tối. Buổi sáng Quý khách nhớ thoa kem chống nắng sau serum nhé!`;
  }

  if (msg.includes('ship') || msg.includes('giao hàng') || msg.includes('vận chuyển') || msg.includes('hà nội') || msg.includes('thời gian')) {
    return `Dạ về thời gian và chính sách giao hàng của Alps trên toàn quốc:
- **Nội thành TP.HCM & Hà Nội**: Giao hỏa tốc trong 2 - 4 giờ hoặc trong ngày.
- **Các tỉnh thành khác**: Giao trong 24 - 48 giờ qua các đối tác chuyển phát nhanh (GHN, Viettel Post).
- **Phí vận chuyển**: Miễn phí 100% cho mọi đơn hàng từ 500.000đ trở lên (đơn dưới 500.000đ đồng giá 25.000đ).
- Toàn bộ sản phẩm được đóng gói trong thùng bảo ôn phòng sạch Zurich chống sốc và kháng nhiệt để giữ trọn vẹn dược tính sinh học!`;
  }

  if (msg.includes('bà bầu') || msg.includes('mang thai') || msg.includes('mẹ bỉm') || msg.includes('nhạy cảm')) {
    return `Quý khách hoàn toàn an tâm nhé! Tất cả sản phẩm của ALPS Pure Essence đều đạt chứng nhận **Thuần Chay Châu Âu (Vegan Certified)** và kiểm định da liễu nghiêm ngặt tại Zurich, Thụy Sĩ:
- 100% Không chứa cồn khô, không Paraben, không hương liệu nhân tạo hay chất bảo quản độc hại.
- Rất lành tính, dịu nhẹ và tuyệt đối an toàn cho phụ nữ đang mang thai, mẹ cho con bú và làn da siêu nhạy cảm nhất.`;
  }

  if (msg.includes('địa chỉ') || msg.includes('cửa hàng') || msg.includes('showroom') || msg.includes('ở đâu') || msg.includes('website')) {
    return `Dạ, Quý khách có thể ghé thăm trải nghiệm hoặc liên hệ với ALPS tại:
- **Website chính thức**: [alps.id.vn](https://alps.id.vn)
- **Showroom Việt Nam**: Tầng 1, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh.
- **Trụ sở Thụy Sĩ**: Bahnhofstrasse 45, 8001 Zurich.
- **Tổng đài CSKH miễn cước 24/7**: 1900 8899.
- **Bác sĩ da liễu VIP**: 0908 123 489.
- **Hộp thư hỗ trợ**: cskh@alps.id.vn.`;
  }

  if (msg.includes('đơn hàng') || msg.includes('kiểm tra') || msg.includes('mã đơn')) {
    return `Dạ, để kiểm tra tình trạng đơn hàng, Quý khách có thể:
1. Nhấn vào mục **"Tài Khoản" -> "Danh Mục Đã Mua"** ngay trên thanh điều hướng website alps.id.vn để xem lộ trình vận chuyển theo thời gian thực.
2. Hoặc cung cấp Mã đơn hàng (ví dụ: ALPS-89421) tại đây, hoặc gọi trực tiếp Hotline **1900 8899** (phím 1), chuyên viên Alps sẽ tra cứu ngay cho Quý khách ạ!`;
  }

  // Default pleasant guidance
  return `Dạ, Alps Pure Essence xin chào Quý khách! 
Em là chuyên viên tư vấn da liễu AI của ALPS (website: alps.id.vn). 

Em có thể hỗ trợ Quý khách:
✨ Phân tích tình trạng da và thiết kế chu trình dưỡng da 5 bước cá nhân hóa.
✨ Cung cấp chi tiết thành phần và công dụng của từng dòng sản phẩm Alps.
✨ Hướng dẫn kiểm tra lộ trình đơn hàng và chính sách đổi trả 30 ngày miễn phí.
✨ Hỗ trợ kết nối bác sĩ da liễu Thụy Sĩ qua hotline **1900 8899**.

Quý khách đang quan tâm đến vấn đề chăm sóc da hoặc cần hỗ trợ về đơn hàng nào ạ?`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'alps-skincare-ai-support',
      domain: 'alps.id.vn',
      timestamp: new Date().toISOString(),
    });
  });

  // AI Customer Care Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message string is required' });
        return;
      }

      // Check for Gemini API key
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          // Build conversation contents
          const contents: any[] = [];

          if (Array.isArray(history)) {
            for (const item of history) {
              if (item && item.text && (item.role === 'user' || item.role === 'model')) {
                contents.push({
                  role: item.role,
                  parts: [{ text: item.text }],
                });
              }
            }
          }

          // Add current message
          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: contents,
            config: {
              systemInstruction: ALPS_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          const replyText = response.text || getSmartFallbackReply(message);
          res.json({
            reply: replyText,
            success: true,
            provider: 'gemini-3.8-flash',
          });
          return;
        } catch (geminiError) {
          console.error('Gemini API error, falling back to Alps Knowledge Base:', geminiError);
          const fallbackReply = getSmartFallbackReply(message);
          res.json({
            reply: fallbackReply,
            success: true,
            provider: 'alps-knowledge-engine',
          });
          return;
        }
      } else {
        // Fallback when GEMINI_API_KEY is not configured
        const fallbackReply = getSmartFallbackReply(message);
        res.json({
          reply: fallbackReply,
          success: true,
          provider: 'alps-knowledge-engine',
        });
        return;
      }
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      res.status(500).json({
        reply: 'Xin lỗi Quý khách, hệ thống đang tạm thời gián đoạn. Vui lòng gọi trực tiếp hotline miễn cước 1900 8899 hoặc thử lại sau giây lát ạ!',
        success: false,
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ALPS Skincare server running on http://0.0.0.0:${PORT} (alps.id.vn)`);
  });
}

startServer();
