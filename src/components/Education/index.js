import React from 'react';
import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { education } from '../../data/constants'; // Assuming you have education data here
import EducationCard from '../Cards/EducationCard';
import { useInView } from 'react-intersection-observer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 0px 0px 60px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 40px 0px 0px 0px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    @media (max-width: 660px) {
        align-items: end;
    }
`;

const FadeInCard = styled.div`
    opacity: ${({ inView }) => (inView ? 1 : 0)};
    transform: translateY(${({ inView }) => (inView ? '0' : '20px')});
    transition: opacity 0.6s ease, transform 0.6s ease;
`;

const Index = () => {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.1 });
    // Add more refs as needed based on the number of education items

    return (
        <Container id="education">
            <Wrapper>
                <Title>Education</Title>
                <Desc>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {education.map((edu, index) => {
                            const refs = [ref1, ref2, ref3]; // Add more refs if necessary
                            const inViews = [inView1, inView2, inView3]; // Add more inViews if necessary
                            const ref = refs[index] || refs[0]; // Default to the first ref if out of bounds
                            const inView = inViews[index] || inViews[0]; // Default to the first inView if out of bounds

                            return (
                                <TimelineItem key={index}>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <FadeInCard ref={ref} inView={inView}>
                                            <EducationCard education={edu} />
                                        </FadeInCard>
                                    </TimelineContent>
                                    <TimelineSeparator>
                                        <TimelineDot variant="outlined" color="secondary" />
                                        {index !== education.length - 1 && <TimelineConnector style={{ background: '#854CE6' }} />}
                                    </TimelineSeparator>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    );
};

export default Index;
