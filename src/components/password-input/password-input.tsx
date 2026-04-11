import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Input } from '@/components/input'

import type { PasswordStrengthLevel, PasswordInputProps } from './password-input.types'

const passwordInput = tv({
  slots: {
    root: 'password-input-root flex flex-col gap-2',
    strengthBars: 'password-input-strength-bars flex gap-1',
    strengthBar: 'password-input-strength-bar h-1 flex-1 rounded-full transition-colors',
    strengthFooter: 'password-input-strength-footer flex items-center justify-between',
    strengthLabel: 'password-input-strength-label text-xs text-muted-foreground',
  },
})

const strengthLevelLabels: Record<PasswordStrengthLevel, string> = {
  'very-weak': 'Very weak',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  'very-strong': 'Very strong',
}

const strengthLevelColors: Record<PasswordStrengthLevel, string> = {
  'very-weak': 'bg-red-500',
  weak: 'bg-orange-500',
  medium: 'bg-yellow-500',
  strong: 'bg-green-500',
  'very-strong': 'bg-emerald-500',
}

const strengthLevelScore: Record<PasswordStrengthLevel, number> = {
  'very-weak': 1,
  weak: 2,
  medium: 3,
  strong: 4,
  'very-strong': 5,
}

function getStrengthLevel(password: string): PasswordStrengthLevel {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return 'very-weak'
  if (score === 2) return 'weak'
  if (score === 3) return 'medium'
  if (score === 4) return 'strong'
  return 'very-strong'
}

function PasswordInput({ showStrength, value, onChange, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const { root, strengthBars, strengthBar, strengthFooter, strengthLabel } =
    passwordInput()

  const level = showStrength && value ? getStrengthLevel(value) : null
  const score = level ? strengthLevelScore[level] : 0
  const activeColor = level ? strengthLevelColors[level] : 'bg-muted'

  const toggle = (
    <button
      type="button"
      onClick={() => setVisible((v) => !v)}
      className="flex items-center pointer-events-auto text-muted-foreground hover:text-foreground"
      tabIndex={-1}
    >
      {visible ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  )

  return (
    <div data-testid="password-input-root" className={root()}>
      <Input
        {...props}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        rightSection={toggle}
      />
      {showStrength && (
        <>
          <div data-testid="password-input-strength-bars" className={strengthBars()}>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                data-testid="password-input-strength-bar"
                className={strengthBar({
                  className: i < score ? activeColor : 'bg-muted',
                })}
              />
            ))}
          </div>
          {level && (
            <div data-testid="password-input-strength-footer" className={strengthFooter()}>
              <span data-testid="password-input-strength-label" className={strengthLabel()}>
                {strengthLevelLabels[level]}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export { PasswordInput }
