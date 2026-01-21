const Idea = require('../models/Idea');
const { Parser } = require('json2csv');

exports.exportIdeastoCSV = async (req, res) => {
    try {
        const ideas = await Idea.find()
            .populate('userId', 'Fullname email')
            .populate('topicId', 'name')
            .populate('categoryId', 'name')
            .lean();

        if (ideas.length === 0) {
            return res.status(404).json({ message: 'Không có ý tưởng nào để xuất ra' });
        }

        const fields = [
            { label: 'Author', value: (row) => row.isAnonymous ? 'Anonymous' : (row.userId ? row.userId.Fullname : 'N/A') },
            { label: 'Submitted Date', value: 'dateTime' },
            { label: 'Topic', value: 'topicId.name' },
            { label: 'Category', value: 'categoryId.name' },
            { label: 'Submitted Date', value: 'dateTime' },
            { label: 'File Attachment', value: 'filePath' },
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(ideas);

        res.header('Content-Type', 'text/csv');
        res.attachment(`Idea_Report_${new Date().toISOString().split('T')[0]}.csv`);
        return res.send(csv);
    } catch (error) {
        console.error("Lỗi Không Xác Định", error);
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
    }
}; 