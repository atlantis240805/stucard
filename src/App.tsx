import {useMemo, useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {FileInput} from '@astryxdesign/core/FileInput';
import {Card} from '@astryxdesign/core/Card';

export default function App() {
  const [schoolName, setSchoolName] = useState('');
  const [orgName, setOrgName] = useState('');
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
                    label="Tên trường (dòng to, màu đen)"
                    placeholder="ASU Preparatory Academy"
                    value={schoolName}
                    onChange={setSchoolName}
                  />
                </div>
                <div style={{flex: '1 1 220px'}}>
                  <TextInput
                    label="Tên tổ chức (dòng nhỏ, màu đỏ mận)"
                    placeholder="Arizona State University"
                    value={orgName}
                    onChange={setOrgName}
                  />
                </div>
              </HStack>
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
                    description="Tải logo (có chữ tên trường sẵn càng tốt) — sẽ thay 2 dòng chữ ở góc, nền trắng tự ẩn."
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
              schoolName={schoolName || 'Tên trường'}
              orgName={orgName || 'Tên tổ chức'}
              studentName={studentName || 'Họ và tên'}
              studentId={studentId || '------'}
              schoolYear={schoolYear || '----/----'}
              gradYear={gradYear || '----'}
              photoUrl={photoUrl}
              logoUrl={logoUrl}
            />
          </div>
        </VStack>
      </main>
    </Theme>
  );
}

function IdCard({
  schoolName,
  orgName,
  studentName,
  studentId,
  schoolYear,
  gradYear,
  photoUrl,
  logoUrl,
}: {
  schoolName: string;
  orgName: string;
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
      {logoUrl && (
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
      )}

      {/* ===== Tên trường (khi CHƯA có logo) ===== */}
      {!logoUrl && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 20,
            maxWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: `2px solid ${maroon}`,
                background: '#fff',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{fontSize: 20, fontWeight: 800, color: maroon}}>
                {schoolName.trim().charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <span
              style={{
                fontSize: 21,
                fontWeight: 800,
                color: '#111',
                textAlign: 'left',
                lineHeight: 1.1,
                maxWidth: 210,
              }}
            >
              {schoolName}
            </span>
          </div>
          <span
            style={{
              marginTop: 2,
              fontSize: 15,
              fontWeight: 700,
              color: maroon,
            }}
          >
            {orgName}
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
