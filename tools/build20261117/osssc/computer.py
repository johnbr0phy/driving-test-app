ITEMS=[]
def family(options, rows):
    for k,(stem,why) in enumerate(rows): ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))
family(['SUM','AVERAGE','MAX','COUNT'],[
('In a spreadsheet, which function should total all numeric expenditure amounts in B2:B13?','SUM adds the numeric values in a range.'),
('Which spreadsheet function returns the arithmetic mean of the numeric monthly receipts in C2:C7?','AVERAGE divides the sum of numeric values by their count.'),
('Which spreadsheet function finds the largest numeric daily attendance in D2:D20?','MAX returns the greatest numeric value.'),
('Which spreadsheet function counts cells containing numbers, rather than counting all nonempty cells?','COUNT counts numeric entries; text entries are not counted.')])
family(['$A$1','A$1','$A1','A1'],[
('An Excel formula is copied down and across. Which reference always points to column A, row 1?','Dollar signs before both column and row make both coordinates absolute.'),
('Which Excel reference keeps row 1 fixed when copied but allows the column to change?','A$1 has an absolute row and a relative column.'),
('Which Excel reference keeps column A fixed when copied but allows the row to change?','$A1 has an absolute column and a relative row.'),
('Which Excel reference allows both its column and row to change relative to the destination when copied?','A1 has no dollar signs, so both coordinates are relative.')])
family(['Scanner','Printer','Microphone','Projector'],[
('Which peripheral captures the contents of a paper form as a digital image?','A scanner converts a physical document into a digital image.'),
('Which peripheral produces a hard copy of a computer document?','A printer places the document on paper.'),
('Which peripheral captures spoken instructions as audio input?','A microphone converts sound into an input signal.'),
('Which peripheral displays a computer presentation on a large external screen or wall?','A projector projects the visual output onto a larger surface.')])
family(['RAM','Solid-state drive','CPU','Operating system'],[
('Which component normally holds active program data temporarily and loses its contents when power is removed?','Ordinary RAM is volatile working memory.'),
('Which component provides persistent file storage without moving mechanical platters?','A solid-state drive stores files persistently using electronic memory.'),
('Which component executes machine instructions and performs arithmetic and logical operations?','The central processing unit executes instructions and processes data.'),
('Which software manages processes, memory and access to hardware resources for applications?','The operating system manages these resources and provides services to applications.')])
family(['Mail merge','Find and replace','Track changes','Page break'],[
('A clerk needs 80 letters with identical wording but different recipient names from a table. Which word-processing feature best fits?','Mail merge combines a common document with individual records.'),
('An organisation name has changed. A writer wants to locate each occurrence of the old name and substitute the new one. Which feature fits?','Find and replace locates matching text and substitutes the specified replacement.'),
('A reviewer needs proposed edits recorded so the author can accept or reject them later. Which feature fits?','Track changes records revisions for review.'),
('A new chapter must begin on the next page regardless of later edits above it. Which feature should be inserted?','A page break forces following content to start on a new page.')])
family(['Copy','Cut','Paste','Undo'],[
('In a document editor, which command places selected text on the clipboard while leaving the original text in place?','Copy duplicates the selection to the clipboard without removing it.'),
('Which editing command places selected text on the clipboard and removes it from its present location?','Cut removes the selected text for moving via the clipboard.'),
('Which editing command inserts the clipboard contents at the current insertion point?','Paste inserts clipboard contents.'),
('Which editing command reverses the most recent reversible action?','Undo reverses the latest supported action rather than manipulating the clipboard.')])
family(['Web browser','Search engine','Email client','Spreadsheet application'],[
('Which software directly renders web pages reached through their URLs?','A web browser retrieves and displays web pages.'),
('Which service indexes web content so users can find relevant pages using keywords?','A search engine uses an index to return relevant search results.'),
('Which application is primarily designed to compose, send and organise electronic messages?','An email client manages email messages and mailboxes.'),
('Which application primarily organises values in cells and recalculates formulas based on those values?','A spreadsheet application provides a grid of cells with formula-based calculation.')])
family(['Restore from a verified backup','Install the security update','Enable multifactor authentication','Revoke the shared link'],[
('An employee accidentally deletes a needed folder. The device is otherwise working, and a verified earlier copy exists. Which action directly recovers the missing files?','Restoring the earlier backup recovers the files; the other actions address different security goals.'),
('A software vendor releases a patch for a known vulnerability in the installed version. Which action directly closes that vulnerability?','Installing the applicable security update fixes the known software flaw.'),
('An account currently needs only a password. Which action directly adds a second independent verification factor to sign-in?','Multifactor authentication adds a separate factor beyond the password.'),
('A confidential document was shared through an unrestricted link. Which action directly stops further access through that link?','Revoking the link disables that access route, though it cannot retrieve copies already downloaded.')])
ITEMS += [
('Cell A1 contains 8 and A2 contains 3. What does =A1+A2*2 evaluate to?', ['14','22','19','16'],'Multiplication precedes addition: 8 + (3 × 2) = 14.'),
('Cells B1:B4 contain 5, 7, a text label, and 12. What does =SUM(B1:B4) return?', ['24','6','8','19'],'SUM ignores the text in the referenced cells and adds 5 + 7 + 12 = 24.'),
('A spreadsheet formula in C4 is =A4+B4. It is copied one row down to C5 using ordinary relative references. What is the copied formula?', ['=A5+B5','=A4+B4','=B4+C4','=A6+B6'],'Moving down one row increases both relative row references by one; the columns do not change.')]
assert len(ITEMS)==35
