import {useMemo, useState} from 'react';
import {toPng} from 'html-to-image';
import {Theme} from '@astryxdesign/core/theme';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {FileInput} from '@astryxdesign/core/FileInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const photoUrl = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );
  const logoUrl = useMemo(() => (logo ? URL.createObjectURL(logo) : null), [
    logo,
  ]);

  // Chụp thẻ thành ảnh PNG rồi tải về máy.
  const downloadCard = async () => {
    const node = document.getElementById('id-card');
    if (!node) return;
    const dataUrl = await toPng(node, {pixelRatio: 3, cacheBust: true});
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'the-hoc-sinh.png';
    a.click();
  };

  const openLink = (url: string) =>
    window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <Theme theme={y2kTheme}>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}
      >
        <VStack gap={6} style={{width: '100%', maxWidth: 760}}>
          <VStack gap={1}>
            <Heading level={1}>Tạo thẻ học sinh</Heading>
            <Text type="body" color="secondary">
              Nhập thông tin bên dưới, thẻ ở dưới sẽ tự cập nhật theo.
            </Text>
          </VStack>

          <Card padding={5}>
            <VStack gap={4}>
              <HStack gap={4} wrap>
                <div style={{flex: '1 1 220px'}}>
                  <TextInput
                    label="Họ và tên học sinh"
                    placeholder="Nguyễn Văn A"
                    value={studentName}
                    onChange={setStudentName}
                  />
                </div>
                <div style={{flex: '1 1 220px'}}>
                  <TextInput
                    label="Mã số học sinh"
                    placeholder="123456"
                    value={studentId}
                    onChange={setStudentId}
                  />
                </div>
              </HStack>
              <HStack gap={4} wrap>
                <div style={{flex: '1 1 220px'}}>
                  <TextInput
                    label="Năm học"
                    placeholder="2025-2026"
                    value={schoolYear}
                    onChange={setSchoolYear}
                  />
                </div>
                <div style={{flex: '1 1 220px'}}>
                  <TextInput
                    label="Năm tốt nghiệp"
                    placeholder="2028"
                    value={gradYear}
                    onChange={setGradYear}
                  />
                </div>
              </HStack>
              <HStack gap={4} wrap>
                <div style={{flex: '1 1 220px'}}>
                  <FileInput
                    label="Logo trường"
                    accept="image/*"
                    value={logo}
                    onChange={files => setLogo(files as File | null)}
                    mode="dropzone"
                    description="Tải logo trường (nền trắng hoặc trong suốt) — hiện ở góc trên, nền trắng tự ẩn."
                  />
                </div>
                <div style={{flex: '1 1 220px'}}>
                  <FileInput
                    label="Ảnh học sinh"
                    accept="image/*"
                    value={photo}
                    onChange={files => setPhoto(files as File | null)}
                    mode="dropzone"
                    description="Chọn ảnh chân dung để hiện trên thẻ."
                  />
                </div>
              </HStack>
            </VStack>
          </Card>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <IdCard
              studentName={studentName || 'Họ và tên'}
              studentId={studentId || '------'}
              schoolYear={schoolYear || '----/----'}
              gradYear={gradYear || '----'}
              photoUrl={photoUrl}
              logoUrl={logoUrl}
            />
          </div>

          <HStack gap={3} hAlign="center">
            <Button
              label="⬇ Tải thẻ về (PNG)"
              variant="primary"
              clickAction={downloadCard}
            />
          </HStack>

          <Divider />

          {/* ===== Liên hệ ===== */}
          <VStack gap={2} style={{alignItems: 'center'}}>
            <Text type="supporting" color="secondary">
              Liên hệ
            </Text>
            <HStack gap={3} hAlign="center" wrap>
              <Button
                label="Facebook"
                variant="secondary"
                onClick={() =>
                  openLink('https://www.facebook.com/thien.phuc.450676/')
                }
              />
              <Button
                label="Telegram"
                variant="secondary"
                onClick={() => openLink('https://t.me/Benedetta24k')}
              />
            </HStack>
          </VStack>
        </VStack>
      </main>
    </Theme>
  );
}

function IdCard({
  studentName,
  studentId,
  schoolYear,
  gradYear,
  photoUrl,
  logoUrl,
}: {
  studentName: string;
  studentId: string;
  schoolYear: string;
  gradYear: string;
  photoUrl: string | null;
  logoUrl: string | null;
}) {
  const gold = '#F5C518';
  const maroon = '#8C1D40';

  // Thẻ kích thước cố định, tỷ lệ ngang chuẩn giống thẻ ATM (~1.59:1).
  const W = 540;
  const H = 340;

  const bar = (extra: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    height: 9,
    borderRadius: 4,
    ...extra,
  });

  const infoRow = (label: string, value: string) => (
    <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
      <span
        style={{
          minWidth: 104,
          fontSize: 16,
          color: '#222',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <span style={{fontSize: 19, fontWeight: 700, color: '#111'}}>{value}</span>
    </div>
  );

  return (
    <div
      id="id-card"
      style={{
        position: 'relative',
        width: W,
        height: H,
        borderRadius: 20,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid #d0d0d0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        isolation: 'isolate',
      }}
    >
      {/* ===== Khối nền màu ===== */}
      {/* Dải vàng ngang trên cùng (full width) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 82,
          background: gold,
        }}
      />
      {/* Khối vàng bên trái nhô XUỐNG, bo lồi góc dưới-phải */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: 100,
          background: gold,
          borderBottomRightRadius: 26,
        }}
      />
      {/* Dải đỏ mận ngang dưới cùng (full width) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 52,
          background: maroon,
        }}
      />
      {/* Khối đỏ mận bên phải nhô LÊN, bo lồi góc trên-trái */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40%',
          height: 84,
          background: maroon,
          borderTopLeftRadius: 26,
        }}
      />

      {/* ===== Gạch trang trí ===== */}
      {/* 2 gạch đỏ mận trên-trái: trên dài, dưới ngắn */}
      <div style={bar({top: 42, left: 24, width: 186, background: maroon})} />
      <div style={bar({top: 64, left: 24, width: 140, background: maroon})} />
      {/* 2 gạch vàng dưới-phải: trên ngắn, dưới dài (đối xứng 180°) */}
      <div style={bar({top: 296, right: 24, width: 140, background: gold})} />
      <div style={bar({top: 312, right: 24, width: 186, background: gold})} />

      {/* ===== Logo ảnh (trên-phải) =====
          Đặt TRỰC TIẾP trong thẻ (không lồng trong div khác) để mix-blend-mode
          trộn đúng với nền vàng → nền trắng của logo tự biến mất. */}
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo trường"
          style={{
            position: 'absolute',
            top: 12,
            right: 20,
            maxWidth: 288,
            maxHeight: 80,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            zIndex: 0,
          }}
        />
      ) : (
        // Chưa có logo → hiện ô gợi ý ở góc.
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 20,
            width: 180,
            height: 56,
            border: `2px dashed ${maroon}`,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{fontSize: 14, fontWeight: 700, color: maroon}}>
            Logo trường
          </span>
        </div>
      )}

      {/* ===== Ảnh học sinh (trái) ===== */}
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: 126,
          width: 100,
          height: 134,
          borderRadius: 6,
          border: `2px solid ${gold}`,
          overflow: 'hidden',
          background: '#f2f2f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Ảnh học sinh"
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <span style={{fontSize: 13, color: '#999'}}>Ảnh</span>
        )}
      </div>

      {/* ===== Thông tin học sinh (phải ảnh) ===== */}
      <div
        style={{
          position: 'absolute',
          left: 144,
          top: 126,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
          zIndex: 5,
        }}
      >
        {infoRow('Name:', studentName)}
        {infoRow('Student ID:', studentId)}
        {infoRow('School Year:', schoolYear)}
        {infoRow('Grad Year:', gradYear)}
      </div>

      {/* ===== Chữ dưới cùng ===== */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 22,
          zIndex: 5,
        }}
      >
        <span style={{fontSize: 20, fontWeight: 800, color: '#fff'}}>
          Student Identification Card
        </span>
      </div>
    </div>
  );
}
