import { useTranslation } from 'react-i18next'

interface ProgressBarProps {
  step: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const { t } = useTranslation()
  const steps = [t('step1'), t('step2'), t('step3')]

  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 text-center">
          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            {index + 1}
          </div>
          <p className="mt-2 text-sm">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default ProgressBar