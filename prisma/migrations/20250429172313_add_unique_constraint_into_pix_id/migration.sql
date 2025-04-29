/*
  Warnings:

  - A unique constraint covering the columns `[pix_id]` on the table `charges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pix_id]` on the table `charges_backup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `charges_pix_id_key` ON `charges`(`pix_id`);

-- CreateIndex
CREATE UNIQUE INDEX `charges_backup_pix_id_key` ON `charges_backup`(`pix_id`);
