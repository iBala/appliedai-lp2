'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import React from 'react'

interface ApplicationProps {
  className?: string
}

// Define the flow steps
type FlowStep = {
  id: number
  title: string
  status: 'pending' | 'loading' | 'complete'
  type: 'step' | 'notification' | 'progress'
  estimatedDate?: string
  progressSteps?: {
    label: string
    status: 'complete' | 'pending' | 'in-progress'
    progress: number // 0 to 100
  }[]
  // Additional fields for notifications
  candidateName?: string
  position?: string
  avatars?: {
    reviewer?: string
    candidate?: string
  }
}

type ProgressDot = {
  id: number
  label: string
  status: 'pending' | 'active' | 'complete'
}

type StepStatus = 'evaluating' | 'complete'

interface ComponentState {
  id: number
  isVisible: boolean
  isCompleted: boolean
  position: number
}

export function Application({ className }: ApplicationProps) {
  const [componentStates, setComponentStates] = useState<ComponentState[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [progressState, setProgressState] = useState({
    currentDot: 0,
    progress: 0,
    isComplete: false
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const [matchStatus, setMatchStatus] = useState<StepStatus>('evaluating')
  const [matchPercentage, setMatchPercentage] = useState(0)
  const [connectionComplete, setConnectionComplete] = useState(false)
  
  const steps: FlowStep[] = [
    { 
      id: 1, 
      type: 'progress',
      title: 'Identifying Job Requirements',
      status: 'pending',
      progressSteps: [
        { label: 'Upload Job Description', status: 'complete', progress: 100 },
        { label: 'Scrape company info', status: 'in-progress', progress: 0 },
        { label: 'Identify requirements', status: 'pending', progress: 0 },
      ]
    },
    {
      id: 2,
      type: 'notification',
      title: 'Mark S. applied for Software Engineer',
      status: 'complete',
      candidateName: 'Mark S.',
      position: 'Software Engineer',
      avatars: {
        reviewer: '/images/feed/reviewer.png',
        candidate: '/images/feed/return.png'
      }
    },
    { 
      id: 3, 
      title: 'Match candidates', 
      status: 'pending',
      type: 'step' 
    },
    { 
      id: 4, 
      title: 'Setting up intro call',
      status: 'pending',
      type: 'step' 
    },
    { 
      id: 5, 
      title: 'Setting up a call with Seth M.',
      status: 'pending',
      type: 'step' 
    },
  ]

  // Initialize first component
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(0)
      setComponentStates([
        { id: steps[0].id, isVisible: true, isCompleted: false, position: 0 }
      ])
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // --- Updated Progress Effect ---
  useEffect(() => {
    if (currentStep !== 0) return;

    console.log("Starting smooth progress animation for step 1");
    let animationFrameId: number;
    const durationPerDot = 2000; // Increased duration for smoother animation
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const dotIndex = Math.floor(elapsed / durationPerDot);
      const progressWithinDot = ((elapsed % durationPerDot) / durationPerDot) * 100;

      // Update dots state
      const dots = steps[0].progressSteps?.map((_, index) => ({
        ...steps[0].progressSteps![index],
        status: index < dotIndex ? 'complete' : 
               index === dotIndex ? 'in-progress' : 
               'pending',
        progress: index < dotIndex ? 100 :
                 index === dotIndex ? progressWithinDot :
                 0
      }));

      if (dotIndex < 3) {
        setProgressState({
          currentDot: dotIndex,
          progress: progressWithinDot,
          isComplete: false
        });
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgressState({
          currentDot: 2,
          progress: 100,
          isComplete: true
        });
        setTimeout(() => {
          handleComponentComplete(steps[0].id);
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentStep]);

  // Add effect to handle connection animation
  useEffect(() => {
    if (currentStep !== 4) return // Only for call setup step

    // Reset state when step starts
    setConnectionComplete(false)
    
    // Set connection as complete after 3 seconds and move to next step
    const connectionTimer = setTimeout(() => {
      setConnectionComplete(true)
      
      // Wait a moment after connection completes before moving to next step
      const nextStepTimer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 1000)
      
      return () => clearTimeout(nextStepTimer)
    }, 3000)

    return () => clearTimeout(connectionTimer)
  }, [currentStep])

  // Modified effect to handle step progression and restart
  useEffect(() => {
    if (currentStep >= steps.length) {
      // Wait a moment before restarting
      const timer = setTimeout(() => {
        setCurrentStep(0)
        setProgressState({
          currentDot: 0,
          progress: 0,
          isComplete: false
        })
        setMatchStatus('evaluating')
        setMatchPercentage(0)
        setConnectionComplete(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length])

  // Modified match evaluation effect
  useEffect(() => {
    if (currentStep === 2) {
      // Reset state at the start of step
      setMatchStatus('evaluating');
      setMatchPercentage(0);
      
      // Evaluation timer
      const evaluationTimer = setTimeout(() => {
        setMatchStatus('complete');
        setMatchPercentage(78);
      }, 1000); // Reduced to 1 second
      
      // Completion timer
      const completionTimer = setTimeout(() => {
        handleComponentComplete(steps[2].id);
      }, 2000); // Total duration of 2 seconds
      
      // Cleanup both timers
      return () => {
        clearTimeout(evaluationTimer);
        clearTimeout(completionTimer);
      };
    }
  }, [currentStep]); // Remove matchStatus dependency to prevent re-runs

  // Modified notification step timing
  useEffect(() => {
    if (currentStep === 1) {
      // Reduced delay before completion
      setTimeout(() => {
        setComponentStates(prev => 
          prev.map(state => 
            state.id === steps[1].id 
              ? { ...state, isCompleted: true }
              : state
          )
        );
        
        // Reduced delay before next step
        setTimeout(() => {
          handleComponentComplete(steps[1].id);
        }, 500); // Reduced from 1000ms
      }, 1000); // Reduced from 2000ms
    }
  }, [currentStep]);

  // Handle component completion and next component entry
  const handleComponentComplete = (stepId: number) => {
    console.log('handleComponentComplete called with stepId:', stepId)
    console.log('Current componentStates:', componentStates)
    
    setComponentStates(prev => {
      // Check if we already have this step
      if (prev.some(state => state.id === stepId && state.isCompleted)) {
        console.log('Step already completed, returning:', prev)
        return prev
      }

      // Mark current component as completed
      const updated = prev.map(state => 
        state.id === stepId 
          ? { ...state, isCompleted: true }
          : state
      )

      // Add next component if available and not already present
      const currentIndex = steps.findIndex(step => step.id === stepId)
      console.log('Current step index:', currentIndex)
      
      if (currentIndex < steps.length - 1) {
        const nextStep = steps[currentIndex + 1]
        console.log('Next step to add:', nextStep)
        
        if (!updated.some(state => state.id === nextStep.id)) {
          updated.push({
            id: nextStep.id,
            isVisible: true,
            isCompleted: false,
            position: updated.length
          })
          console.log('Added new component:', nextStep.id)
        }
        
        // Update positions of all components
        updated.forEach((state, idx) => {
          state.position = idx
        })
      }

      console.log('Updated componentStates:', updated)
      return updated
    })

    // Move to next step
    setCurrentStep(prev => {
      console.log('Moving to next step:', prev + 1)
      return prev + 1
    })
  }

  const renderProgressContent = (step: FlowStep) => {
    if (!step.progressSteps) return null

    const dots: ProgressDot[] = [
      { id: 1, label: 'Upload Job Description', status: 'complete' },
      { id: 2, label: 'Scrape company info', status: 'pending' },
      { id: 3, label: 'Identify requirements', status: 'pending' }
    ]

    // Simplified progress width calculation
    const getProgressWidth = () => {
      if (progressState.currentDot >= 2) return 100
      return (progressState.currentDot * 50) + (progressState.progress / 2)
    }

    return (
      <div className="space-y-6 pt-6">
        {/* Centered title with icon */}
        <div className="flex justify-center items-center space-x-2">
          <svg 
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <circle cx="11" cy="14" r="2" />
            <path d="M13.8 16.8L19 22" />
          </svg>
          <h3 className="text-lg font-semibold">{step.title}</h3>
        </div>
        
        {/* Progress indicator container */}
        <div className="px-8">
          <div className="relative pt-2 pb-12">
            {/* Base line */}
            <div className="absolute h-[2px] w-full bg-white/20" />
            
            {/* Progress line */}
            <div 
              className="absolute h-[2px] bg-white transition-all duration-300"
              style={{ width: `${getProgressWidth()}%` }}
            />

            {/* Dots and labels */}
            <div className="absolute w-full flex justify-between">
              {dots.map((dot, index) => (
                <div key={dot.id} className="absolute" style={{ left: `${index * 50}%`, transform: 'translate(-50%, -50%)' }}>
                  {/* Dot */}
                  <div 
                    className={clsx(
                      "h-4 w-4 rounded-full transition-all duration-300",
                      index < progressState.currentDot ? 'bg-white' :
                      index === progressState.currentDot ? 'bg-white/20 animate-pulse' :
                      'bg-white/20'
                    )}
                  />
                  {/* Label */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32">
                    <span className={clsx(
                      "text-sm text-center block",
                      index <= progressState.currentDot ? 'text-white' : 'text-white/40'
                    )}>
                      {dot.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = (step: FlowStep, index: number) => {
    if (step.type === 'progress') {
      return renderProgressContent(step)
    }
    
    if (step.type === 'notification') {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-white/70"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <p className="ml-3 text-sm font-semibold md:text-md">
              {step.title}
            </p>
          </div>
          {componentStates.find(state => state.id === step.id && state.isCompleted) && (
            <svg 
              className="h-5 w-5 text-green-400 animate-[fadeIn_0.3s_ease-out]" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      )
    }

    // Special handling for match evaluation step
    if (step.title === 'Match candidates') {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {matchStatus === 'evaluating' ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-3" />
            ) : (
              <svg 
                className="h-4 w-4 mr-3 text-green-400 animate-[fadeIn_0.3s_ease-out]" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            <p className="text-md font-medium text-white">
              {matchStatus === 'evaluating' ? 'Evaluating candidates' : 'Match candidates'}
            </p>
          </div>
          <div 
            className={clsx(
              "px-2 py-1 rounded-full text-sm font-medium",
              matchStatus === 'evaluating' 
                ? 'bg-white/10 animate-pulse' 
                : 'bg-white/10 animate-[fadeIn_0.3s_ease-out]'
            )}
          >
            {matchStatus === 'evaluating' ? (
              <span className="inline-flex items-center">
                Analyzing
                <span className="ml-1">...</span>
              </span>
            ) : (
              <span className="inline-flex items-center">
                {matchPercentage}% match
                <svg 
                  className="w-4 h-4 ml-1 text-green-400 animate-[fadeIn_0.3s_ease-out]" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      )
    }

    // Special handling for panel meetings
    if (step.title === 'Setting up a call with Seth M.') {
      return (
        <div className="flex items-center">
          <div className="flex items-center">
            {/* First user icon */}
            <div 
              className={clsx(
                "relative transition-all duration-300",
                connectionComplete ? "translate-x-4" : ""
              )}
            >
              <svg 
                className="h-5 w-5 text-white" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            {/* Animated connection line */}
            <div 
              className={clsx(
                "mx-2 h-[2px] bg-white/20 relative overflow-hidden transition-all duration-300",
                connectionComplete ? "w-4" : "w-8"
              )}
            >
              {!connectionComplete ? (
                <div className="absolute inset-0 bg-white animate-[connectionDot_1s_linear_infinite]" />
              ) : (
                <div className="absolute inset-0 bg-white animate-[fadeIn_0.3s_ease-out]" />
              )}
            </div>

            {/* Second user icon */}
            <div 
              className={clsx(
                "relative transition-all duration-300",
                connectionComplete ? "-translate-x-4" : ""
              )}
            >
              <svg 
                className="h-5 w-5 text-white" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <p className="ml-3 text-md font-medium text-white">
            {connectionComplete ? 'Call scheduled with Seth M.' : step.title}
          </p>
        </div>
      )
    }

    // Default step rendering
    return (
      <div className="flex items-center">
        {index === currentStep ? (
          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-3" />
        ) : index < currentStep ? (
          <svg className="h-4 w-4 mr-3 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : step.title === 'Setting up intro call' ? (
          <svg 
            className="h-4 w-4 mr-3 text-white" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" 
              fill="currentColor"
            />
          </svg>
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-white/50 mr-3" />
        )}
        <p className="text-md font-medium text-white">{step.title}</p>
      </div>
    )
  }

  return (
    <div className={clsx('flex w-full flex-col', className)}>
      {/* Replace console.log with a hidden dev element */}
      <div className="hidden">
        {JSON.stringify({
          currentStep,
          componentStates,
          matchStatus,
          connectionComplete
        })}
      </div>
      <div 
        ref={containerRef}
        className="relative h-[600px] overflow-hidden"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="space-y-2 w-full">
            {componentStates.map((state) => {
              const step = steps.find(s => s.id === state.id)!
              const isLatest = state.id === componentStates[componentStates.length - 1].id
              
              return (
                <div
                  key={`${state.id}-${state.position}-${state.isCompleted ? 'complete' : 'active'}`}
                  className={clsx(
                    'group relative w-full transition-all duration-1500',
                    step.type === 'progress' ? 'min-h-[180px]' : 'min-h-[76px]',
                    isLatest ? 'animate-[stackEntry_1.5s_cubic-bezier(0.4, 0, 0.2, 1)_forwards]' : ''
                  )}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, calc(-50% + ${
                      componentStates.length > 1 && !isLatest 
                        ? -80 * (componentStates.length - state.position - 1)
                        : 0
                    }px))`,
                    opacity: state.isVisible ? 1 : 0,
                    zIndex: componentStates.length - state.position,
                    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="relative rounded-xl opacity-[--opacity] backdrop-blur-2xl">
                    <div className="absolute inset-0 z-0 rounded-xl bg-white/15 shadow-[0px_-1px_1px_0px_rgba(255,255,255,0.10)inset,0px_1px_1px_0px_rgba(255,255,255,0.25)inset,0px_8px_6px_0px_rgba(0,0,0,0.05)]" />
                    <div className="relative z-10 p-4">
                      {step.type === 'progress' 
                        ? renderProgressContent(step) 
                        : renderStepContent(step, currentStep)
                      }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
