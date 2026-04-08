import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

const Content = styled.div`
  padding: 25px;
`;

const InputSection = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const DisplaySection = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid #e9ecef;
`;

const TimeDisplay = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
`;

const YieldCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const YieldValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.color || '#333'};
  margin: 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const YieldLabel = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const MarketStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

const StatusItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatusValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.color || '#333'};
`;

const StatusLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #4cd964 0%, #5ac8fa 100%);
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: linear-gradient(135deg, #ff9500 0%, #ff5e3a 100%);
  color: white;
`;

const Footer = styled.div`
  padding: 15px 25px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
  color: #999;
  font-size: 12px;
`;

const App: React.FC = () => {
  const [yieldValue, setYieldValue] = useState<string>('5.67');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(format(now, 'yyyy年MM月dd日 HH:mm:ss', { locale: zhCN }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getYieldColor = (value: string) => {
    const num = parseFloat(value);
    if (num > 0) return '#ff2d55';
    if (num < 0) return '#4cd964';
    return '#8e8e93';
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('yield-display');
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          logging: false,
        });
        
        const link = document.createElement('a');
        link.download = `yield-showcase-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // 如果是Tauri环境，可以保存到本地
        if (window.__TAURI__) {
          const { writeBinaryFile, BaseDirectory } = await import('@tauri-apps/api/fs');
          const { appDir } = await import('@tauri-apps/api/path');
          
          const dir = await appDir();
          const fileName = `yield-showcase-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.png`;
          const arrayBuffer = await canvas.toBlob().then(blob => blob.arrayBuffer());
          
          await writeBinaryFile(fileName, new Uint8Array(arrayBuffer), { dir: BaseDirectory.App });
        }
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    alert('分享功能准备就绪！图片已保存到本地，可以分享给朋友炫耀你的收益率！🎉');
  };

  return (
    <Container id="yield-display">
      <Header>
        <Title>今日收益率</Title>
        <Subtitle>投资表现展示</Subtitle>
      </Header>
      
      <Content>
        <InputSection>
          <Label>输入今日收益率 (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={yieldValue}
            onChange={(e) => setYieldValue(e.target.value)}
            placeholder="例如：5.67"
          />
        </InputSection>
        
        <DisplaySection>
          <TimeDisplay>{currentTime}</TimeDisplay>
          
          <YieldCard>
            <YieldLabel>今日收益率</YieldLabel>
            <YieldValue color={getYieldColor(yieldValue)}>
              {parseFloat(yieldValue) > 0 ? '+' : ''}{yieldValue}%
            </YieldValue>
            <YieldLabel>较昨日 {parseFloat(yieldValue) > 0 ? '📈 上涨' : '📉 下跌'}</YieldLabel>
          </YieldCard>
          
          <MarketStatus>
            <StatusItem>
              <StatusValue color="#ff2d55">+2.34%</StatusValue>
              <StatusLabel>沪深300</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusValue color="#4cd964">+1.89%</StatusValue>
              <StatusLabel>创业板指</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusValue color="#ff9500">+3.12%</StatusValue>
              <StatusLabel>自选组合</StatusLabel>
            </StatusItem>
          </MarketStatus>
        </DisplaySection>
        
        <ButtonGroup>
          <PrimaryButton onClick={handleGenerateImage} disabled={isGenerating}>
            {isGenerating ? '生成中...' : '📸 生成炫耀图片'}
          </PrimaryButton>
          <SecondaryButton onClick={handleShare}>
            📤 分享炫耀
          </SecondaryButton>
        </ButtonGroup>
      </Content>
      
      <Footer>
        数据仅供参考 • 投资有风险 • 基于Tauri开发
      </Footer>
    </Container>
  );
};

export default App;