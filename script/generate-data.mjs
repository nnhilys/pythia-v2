import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const BASE_PATH = path.join(process.cwd(), 'src', 'lib', 'data')

const genders = ['Male', 'Female']
const countriesCities = [
  ['Vietnam', 'Ho Chi Minh'],
  ['Vietnam', 'Hanoi'],
  ['USA', 'New York'],
  ['USA', 'Los Angeles'],
  ['UK', 'London'],
  ['UK', 'Manchester'],
  ['Australia', 'Sydney'],
  ['Australia', 'Melbourne'],
  ['Canada', 'Toronto'],
  ['Canada', 'Vancouver'],
  ['Germany', 'Berlin'],
  ['France', 'Paris'],
]
const jobTitles = ['General Manager', 'Software Engineer', 'Marketing Manager', 'Financial Analyst', 'Project Manager', 'Data Scientist', 'Sales Executive', 'HR Specialist', 'Accountant', 'Consultant']
const jobIndustries = ['IT', 'Finance', 'Marketing', 'Construction', 'Healthcare', 'Education', 'Retail', 'Hospitality']
const wealthSegments = ['High Net Worth', 'Mass Affluent', 'Affluent']

const totalCustomers = 1000 + Math.random() * 1000

function randomDobDate(startYear = 1960, endYear = 2000) {
  const start = new Date(startYear, 0, 1)
  const end = new Date(endYear, 11, 31)
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

let demographic_csv = 'id,dob,gender,country,city,job_title,job_industry,wealth_segment\n'

for (let i = 1; i <= totalCustomers; i++) {
  const [country, city] = countriesCities[Math.floor(Math.random() * countriesCities.length)]
  const row = [
    `ID${String(i).padStart(4, '0')}`,
    randomDobDate(),
    genders[Math.floor(Math.random() * genders.length)],
    country,
    city,
    jobTitles[Math.floor(Math.random() * jobTitles.length)],
    jobIndustries[Math.floor(Math.random() * jobIndustries.length)],
    wealthSegments[Math.floor(Math.random() * wealthSegments.length)],
  ]
  demographic_csv += `${row.join(',')}\n`
}

fs.writeFileSync(path.join(BASE_PATH, 'demographic.csv'), demographic_csv, 'utf8')

function randomUserId(min = 1, max = totalCustomers) {
  const id = (Math.random() * (max - min) + min).toFixed(0)
  return `ID${String(id).padStart(4, '0')}`
}

function randomTransactionDate(startYear = 2020, endYear = 2024) {
  const start = new Date(startYear, 0, 1)
  const end = new Date(endYear, 11, 31)
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

function randomAmount(min = 10, max = 1000) {
  return (Math.random() * (max - min) + min).toFixed(2)
}

let transaction_csv = 'customer_id,transaction_date,transaction_amount\n'

for (let i = 1; i <= 100_000 + Math.random() * 10_000; i++) {
  const row = [
    randomUserId(),
    randomTransactionDate(),
    randomAmount(),
  ]
  transaction_csv += `${row.join(',')}\n`
}

fs.writeFileSync(path.join(BASE_PATH, 'transactions.csv'), transaction_csv, 'utf8')
