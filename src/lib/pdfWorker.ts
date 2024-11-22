import { GlobalWorkerOptions } from 'pdfjs-dist'
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
GlobalWorkerOptions.workerSrc = pdfjsWorker.default